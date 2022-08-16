module.exports = {

    // URL to this API
    url: 'https://api.yinga.games',

    // Network port to listen on
    port: 3000,

    // MongoDB Database
    database: {
        url: 'mongodb://localhost:27017/',
        name: 'YingaGamingAPI'
    },

    // Redirects
    redirect: {

        //Successful payment
        success: 'https://yinga.games/shop-success',

        //Unknown GET request
        unknown: 'https://youtu.be/fC7oUOUEEi4'

    },

    // API keys
    keys: {
        mollie: 'MOLLIE_KEY_HERE'
    }

}