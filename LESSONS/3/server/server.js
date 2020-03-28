const http = require('http')
const fh = require('../utils/cmmFileHandler') //fh.read(file) fh.write(file, data)
const express = require('express')

const server = express()
server.use(express.json())

server.use('/', express.static('./server/static'))

server.listen(8080)
// const server = http.createServer((req, res) => {
//     if (req.url === '/') {
//         res.write('<h1>Main</h1>')
//         res.end()
//     }
//     if (req.url === '/app') {
//         res.write('App')
//         res.end()
//     }
// })

// server.listen(8080)
// server.on('connection', () => {
//     console.log('new connection')
// })

// console.log('Server runs @ 8080...')