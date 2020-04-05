const fs = require('fs')
const consolePrint = require ('./ansi')
const path = require('path')
try {fs.mkdirSync(path.resolve(__dirname, '../logs'))} catch (e) {}

module.exports =  text => {
    const logPath = path.resolve(__dirname, '../logs/game.log')
    fs.readFile(logPath, 'utf-8', (err, data) => {
        if (err) fs.writeFileSync(logPath, '')
        let log = !err ? data : '';
        log += text
        fs.writeFile(logPath, log, err => {
            if(err) consolePrint('Не удалось записать лог', 'error')
        })
    })
}