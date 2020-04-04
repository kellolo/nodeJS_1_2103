let express = require('express')
let fs = require('fs')

let cart = require('../cart.js')
let writer = require('../writer.js')

let router = express.Router()

router.get('/', (req, res) => { // /cart
    //res.send('Hello User')
    fs.readFile('./server/database/cart.json', 'utf-8', (err, data) => {
        if (!err) {
            res.send(data)
        } else {
            res.sendStatus(404)
        }
    })
})

//add new item >> cart
router.post('/', (req, res) => {
    fs.readFile('./server/database/cart.json', 'utf-8', (err, data) => {
        if (!err) {
            let newCart = cart.add(req, JSON.parse(data))
            writer('./server/database/cart.json', newCart, res)
        } else {
            res.sendStatus(404)
        }
    })
})

//change item in cart
router.put('/:id', (req, res) => {
    fs.readFile('./server/database/cart.json', 'utf-8', (err, data) => {
        if (!err) {
            let newCart = cart.change(req, JSON.parse(data))
            writer('./server/database/cart.json', newCart, res)
        } else {
            res.sendStatus(404)
        }
    })
})

// //delete item <<< cart
router.delete('/:id', (req, res) => {
    fs.readFile('./server/database/cart.json', 'utf-8', (err, data) => {
        if (!err) {
            let newCart = cart.delete(req, JSON.parse(data))
            writer('./server/database/cart.json', newCart, res)
        } else {
            res.sendStatus(404)
        }
    })
})

module.exports = router