const fHandler = require('./handler')
const moment = require('moment')

module.exports = function(us, pc, winner) {

    let file = './hw/log/log.txt'

    let logItem = `
    \n
        *** round *** \n
        User: ${us};\n
        Terminator: ${pc};\n
        Winner: ${winner};\n
        time: ${moment().format('MMMM DD YYYY, hh:mm:ss')}\n
        *** end ***\n
    \n
    `
    fHandler(file, logItem)
}