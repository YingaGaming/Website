const { RCONClient } = require('@minecraft-js/rcon')
const config = require('../../config')

const client = new RCONClient(config.rcon.host, config.rcon.password, config.rcon.port);
client.connect();

client.on('response', (requestId, packet) => {
    console.log(`RCON: ${packet.payload}`)
});

module.exports = client