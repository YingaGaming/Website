const { RCONClient } = require('@minecraft-js/rcon')
const config = require('../../config')

const client = new RCONClient(config.rcon.host, config.rcon.password, config.rcon.port);

module.exports.connect = () => {
    client.connect();
    console.log('RCON Connected')
}

module.exports.client = client