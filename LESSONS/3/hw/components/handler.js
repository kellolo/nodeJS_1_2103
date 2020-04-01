const fs = require('fs')
const ansi = require('../../utils/ansi')

module.exports = function(file, data) {
    //console.log(file, data)
    fs.readFile(file, 'utf-8', (err, d) => {
        if (!err) {
            let log = d
            log += data
            fs.writeFile(file, log, e => { 
                if(!e) {
                    ansi('Log updated', 'alert')
                } else {
                    ansi('Error!', 'error')
                }
            })
        } else {
            console.log(err)
        }
    })
}