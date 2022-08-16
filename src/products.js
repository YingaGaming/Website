module.exports = {

    "smp_premium": {
        name: 'YingaGaming SMP Premium',
        check: (price) => {
            return new Promise((resolve, reject) => {
                if (price === 10) {
                    resolve()
                } else {
                    reject('Falscher Preis')
                }
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
                    resolve()
                }
            })
        }
    }

}