const express = require('express')
const { createMollieClient } = require('@mollie/api-client');
const fs = require('fs')
const config = require('../config')
const products = require('./products')
const mongo = require('./util/mongo')

const mollie = createMollieClient({ apiKey: config.keys.mollie });

const app = express()

app.use(express.json())

app.post('/order', (req, res) => {

    if (!req.body.product || !req.body.price || !req.body.username) {
        res.status(400).json('Missing Data')
        return
    }

    if (!products[req.body.product]) {
        res.status(404).json('Unknown Product')
        return
    }

    let product = products[req.body.product]
    let price = parseFloat(req.body.price)
    let username = req.body.username

    if (isNaN(price)) return res.status(400).json('Invalid Price')

    product.check(price, username)
        .then(() => {

            mollie.payments.create({
                amount: {
                    value: price.toFixed(2),
                    currency: 'EUR'
                },
                description: product.name,
                redirectUrl: config.redirect.success,
                webhookUrl: config.url + '/webhook'
            }).then(payment => {

                mongo.insert('Orders', {
                    id: payment.id,
                    product: product,
                    price: price,
                    username: username.toLowerCase(),
                    created: Date.now(),
                    paid: false
                })

                res.json(payment.getCheckoutUrl())
            })

        })
        .catch(err => {
            console.error(err)
            res.status(500).json(err)
        })

})

app.post('/webhook', (req, res) => {
    let payment = mollie.payments.get(req.body.id)

    if (!payment || payment.status != 'paid') return res.send('success')

    mongo.query('Orders', { id: payment.id }, orders => {
        if (!orders[0]) return res.send('success')
        let order = orders[0]

        if (!fs.existsSync(`./actions/${order.product}.js`)) return res.send('success')

        require(`./actions/${order.product}.js`).run(order)

    })

})

app.get('*', (req, res) => {
    res.redirect(config.redirect.unknown)
})

app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`)
})