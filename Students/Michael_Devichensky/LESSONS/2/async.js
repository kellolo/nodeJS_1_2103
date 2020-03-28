// setTimeout(() => {
//    console.log('async.js > console.log: work')
// }, 1000)
//------------------------------------------------------------------------
// import { reject } from "async" // не успел за преподом докдить

// let asyncPromis = () => {
//    return new Promise ((result, reject) => {
//       setTimeout(() => {
//          console.log('dоne')
//       }, 1000)
//       setTimeout(() => {
//          if(staus) {
//            result('Процесс завершон')
//          } else {
//             reject('Процесс не был  завершон')
//          }
//       }, 2000)
//    })
// }
// asyncPromis().then((data) => {
// })
//------------------------------------------------------------------------
const fs = require('fs');// читаем с файла
const readline = require('readline')

fs.readFile('./db/text.txt', 'utf8', (error, data) => {
   if(!error) {
      console.log(data)
      const inp = readline.createInterface({
         input: process.stdin,
         output: process.stdout,
      })

      let allTxt = data
      inp.on('line', (text) => {
         allTxt += `\n${text}`
         fs.writeFile('./db/text.txt', text, (error) => {
            if(!error) {
               console.log('Статус: ок')
               inp.close()
            } else {
               console.log('Статус: ОШИБКА')
               inp.close()
            }
         })
      })
   } else {
      console.log(error)
   }
})