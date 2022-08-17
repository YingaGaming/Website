const rcon = require('../util/rcon')
const mongo = require('../util/mongo')

module.exports.run = (order) => {
    return
    rcon.client.executeCommand(`lp user ${order.username} parent add premium`)
    rcon.client.executeCommand(`tellraw @a ["",{"text":"[","color":"dark_aqua"},{"text":"Shop","bold":true,"color":"gold"},{"text":"] ","color":"dark_aqua"},{"text":"${order.username} ","bold":true,"color":"light_purple"},{"text":"ist jetzt Premium!","color":"gold"}]`)

    mongo.update('Orders', { id: order.id }, { processed: true })

}