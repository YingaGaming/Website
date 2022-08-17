const rcon = require('../util/rcon')

module.exports.run = (order) => {
    rcon.client.executeCommand(`lp user ${order.username} parent add premium`)
    rcon.client.executeCommand(`tellraw @a ["",{"text":"[","color":"dark_aqua"},{"text":"Shop","bold":true,"color":"gold"},{"text":"] ","color":"dark_aqua"},{"text":"${order.username} ","bold":true,"color":"light_purple"},{"text":"ist jetzt Premium!","color":"gold"}]`)
}