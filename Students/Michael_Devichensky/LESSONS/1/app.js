// let a = require('./components/comp/')
// let b = 20
// console.log(a > b ? 'A' : 'B')

let ansi = require('ansi')

let cursor = ansi(process.stdout)
// cursor.beep()

cursor.red().write('Red str \n').reset()
console.log('Hello node')
cursor.green().bg.red().write('ANOTHER \n').reset()
console.log('Hello node')

