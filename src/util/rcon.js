const { RCONClient } = require('@minecraft-js/rcon')
const config = require('../../config')

const client = new RCONClient(config.rcon.host, config.rcon.password, config.rcon.port);

client.on('disconnect', () => {
    client.connect()
})

module.exports.connect = () => {
    client.connect();
    console.log('RCON Connected')
}

module.exports.client = client