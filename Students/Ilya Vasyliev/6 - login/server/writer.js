let fs = require('fs')

module.exports = (file, cart, res) => {
    fs.writeFile(file, JSON.stringify(cart), err => {
        if(!err) {
            res.json({result: 1})
        } else {
            res.sendStatus(500)
        }
    })
}