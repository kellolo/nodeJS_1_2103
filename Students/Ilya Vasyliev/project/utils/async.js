const coloredAlert = require('./ansi')
const fs = require('fs')
const readline = require('readline')


fs.readFile('./db/text.txt', 'utf-8', (err, data) => {
    if(!err) {
        console.log(data)

        const inp = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        let allTxt = data

        inp.on('line', text => {
            allTxt += `\n${text}`
            fs.writeFile('./db/text.txt', allTxt, err => {
                console.log('Status:')
                if(!err) {
                    coloredAlert('OK', 'alert')
                    inp.close()
                } else {
                    coloredAlert('ERR', 'error')
                    inp.close()
                }
            })
        })
    } else {
        coloredAlert('file not found', 'error')
    }
})


//coloredAlert('Hello Async', 'alert')
// let time = 1000

// console.log('чтение файла')

// function readSomething() {
//     setTimeout(() => {
//         console.log('Процесс завершен')
//         return 'прочитал'
//     }, time)
// }

// console.log(readSomething())

// let asyncPromise = () => {
//     return new Promise ((res, rej) => {
//         let status
//         setTimeout(() => {
//             console.log('done')
//             status = 'ok'
//         }, time)
        
//         setTimeout(() => {
//             if (status) {
//                 res('Процесс завершен')
//             } else {
//                 rej('Процесс не был завершен')
//             }
//         }, 2000)
//     })
// }

// asyncPromise()
//     .then(data => {
//         coloredAlert(data, 'alert')
//     })
//     .catch(err => {
//         coloredAlert(err, 'error')
//     })
    // .finally(() => {

    // })
