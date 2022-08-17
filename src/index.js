const express = require('express')
const { createMollieClient } = require('@mollie/api-client');
const fs = require('fs')
const fetch = require('cross-fetch')
const config = require('../config')
const products = require('./products')
const mongo = require('./util/mongo')
const rcon = require('./util/rcon')

rcon.connect()

const mollie = createMollieClient({ apiKey: config.keys.mollie });

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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
                    product: req.body.product,
                    price: price,
                    username: username.toLowerCase(),
                    created: Date.now(),
                    paid: false,
                    processed: true
                }).then(() => {
                    res.json(payment.getCheckoutUrl())
                }).catch(err => {
                    console.error(err)
                    res.status(500).json('Unknown Error')
                })
            })

        })
        .catch(err => {
            console.error(err)
            res.status(500).json(err)
        })

})

app.post('/webhook', async(req, res) => {
    let payment = await mollie.payments.get(req.body.id)

    if (!payment || payment.status != 'paid') return res.send('success')

    mongo.query('Orders', { id: payment.id })
        .then(orders => {
            if (!orders[0]) return res.send('success')
            let order = orders[0]

            mongo.update('Orders', { id: payment.id }, { paid: true })

            if (order.processed) return res.send('success')

            fetch(config.log_webhook, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    embeds: [{
                        title: "Bestellung Bezahlt",
                        description: payment.description,
                        color: 65280,
                        fields: [
                            {
                                name: 'Benutzer',
                                value: `${order.username}`
                            },
                            {
                                name: 'Preis',
                                value: `${payment.amount.value} ${payment.amount.currency}`
                            },
                            {
                                name: 'Methode',
                                value: payment.method
                            }
                        ],
                        footer: {
                            text: id
                        }
                    }]
                })
            })

            if (!fs.existsSync(__dirname + `/actions/${order.product}.js`)) return res.send('success')

            require(`./actions/${order.product}.js`).run(order)
        })
        .catch(err => {
            console.error(err)
            res.status(500).json(err)
        })

})

app.get('*', (req, res) => {
    res.redirect(config.redirect.unknown)
})

app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`)
})