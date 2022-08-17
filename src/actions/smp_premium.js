const rcon = require('../util/rcon')

module.exports.run = (order) => {
    rcon.client.executeCommand(`lp user ${order.username} parent add premium`)
}