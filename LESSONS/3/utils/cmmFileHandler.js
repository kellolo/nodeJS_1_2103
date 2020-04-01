const fs = require('fs')

module.exports = {
    read(file) {
        fs.readFile(file, 'utf-8', (err, d) => {
            if (!err) {
                return d
            }
        })
    },
    write(file, data) {
        fs.writeFile(file, data, e => { 
            if(e) {
                console.log(e)
            }
        })
    }
}