const ansi = require('ansi')
const cursor = ansi(process.stdout)

module.exports = (str, type) => {
    switch (type) {
        case 'status':
            cursor.black().bg.green().write(` ${str}: `).reset().bg.reset()
            break
        case 'alert':
            cursor.black().bg.green().write(str).reset().bg.reset().write(`\n`)
            break
        case 'error':
            cursor.white().bg.red().write(str).reset().bg.reset().write(`\n`)
            break
        default:
            cursor.white().write(str).reset().write(`\n`)
            break
    }
}