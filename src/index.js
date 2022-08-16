const express = require('express')
const config = require('../config')

const app = express()

app.use(express.json())

app.get('*', (req, res) => {
    res.redirect(config.redirect)
})

app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`)
})

