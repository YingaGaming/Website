const mongo = require('./util/mongo')

module.exports = {

    "smp_premium": {
        name: 'YingaGaming SMP Premium',
        check: (price, username) => {
            return new Promise((resolve, reject) => {
                if (price != 10) {
                    reject('Falscher Preis')
                    return
                }

                mongo.query('Orders', { product: 'smp_premium', username: username.toLowerCase(), paid: true }, orders => {
                    if (orders[0]) {
                        reject('Du besitzt bereits Premium')
                        return
                    }

                    resolve()

                })

            })
        }
    },

    "donation": {
        name: 'Spende',
        check: (price) => {
            return new Promise((resolve, reject) => {
                if (price > 100) {
                    reject('Maximal 100€')
                } else if (price < 5) {
                    reject('Minimal 5€')
                } else {
                    resolve
                }

            })
        }
    }

}