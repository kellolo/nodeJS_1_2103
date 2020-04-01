const log = require('./logger')
const ansi = require('../../utils/ansi')

module.exports = function(us, pc, vars) {
    let winner

    if((us == 1 && pc == 2)||(us == 2 && pc == 3)||(us == 3 && pc == 1)) {
        winner = 'User'
    } else if (us == pc) {
        winner = 'Both'
    } else {
        winner = 'Terminator'
    }
    ansi(`Winner: ${winner}`, 'alert')
    log(vars[us], vars[pc], winner)
}