module.exports = {

    // URL to this API
    url: 'https://api.yinga.games',

    // Network port to listen on
    port: 3000,

    // Discord webhook for logging purchases
    log_webhook: 'URL_HERE',

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

    // Minecraft RCON data
    rcon: {
        host: '127.0.0.1',
        port: 25575,
        password: 'verysecure'
    },

    // API keys
    keys: {
        mollie: 'MOLLIE_KEY_HERE'
    }

}