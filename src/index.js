const express = require('express')
const { createMollieClient } = require('@mollie/api-client');
const config = require('../config')
const products = require('./products')

const mollie = createMollieClient({ apiKey: config.keys.mollie });

const app = express()

app.use(express.json())

app.post('/order', (req, res) => {

    if (!req.body.product || !req.body.price) {
        res.status(400).json('Missing Data')
        return
    }

    if (!products[req.body.product]) {
        res.status(404).json('Unknown Product')
        return
    }

    let product = products[req.body.product]
    let price = parseFloat(req.body.price)

    if(isNaN(price))return res.status(400).json('Invalid Price')

    product.check(price)
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
                res.json(payment.getCheckoutUrl())
                
            })

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