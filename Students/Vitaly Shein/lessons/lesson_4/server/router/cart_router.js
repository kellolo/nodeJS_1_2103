let express = require('express');
let fs = require('fs');

let router = express.Router();

router.get('/', (req, res) => { // /cart
    //res.send('Hello User')
    fs.readFile('./server/database/cart.json', 'utf-8', (err, data) => {
        if (!err) {
            res.send(data)
        } else {
            res.sendStatus(404)
        }
    })
});

//add new item >> cart
router.post('/', (req, res) => {
    let cart = null
    fs.readFile('./server/database/cart.json', 'utf-8', (err, data) => {
        if (!err) {
            cart = JSON.parse(data);
            //здесь
            cart.contents.push(req.body);
            //здесь
            fs.writeFile('./server/database/cart.json', JSON.stringify(cart), err => {
                if(!err) {
                    res.json({result: 1})
                } else {
                    res.sendStatus(500)
                }
            })

        } else {
            res.sendStatus(404)
        }
    })
});

//change item quantity >> cart
router.put('/:id', function(req, res, next) {

    let cart = null,
        delta = req.body.delta,
        index = undefined


    fs.readFile('./server/database/cart.json', 'utf-8', (err, data) => {
        if (!err) {
            cart = JSON.parse(data)
            cart.contents.forEach((e, i) => {
                if (e.id_product === req.params.id){
                    index = i
                }
            })

            if (index !== undefined) cart.contents[index].quantity += delta

            fs.writeFile('./server/database/cart.json', JSON.stringify(cart), err => {
                if(!err) {
                    res.json({result: 1})
                } else {
                    res.sendStatus(500)
                }
            })

        } else {
            res.sendStatus(404)
        }
    });
});

//delete item >> cart
router.delete('/:id', function(req, res) {
    let cart = null,
        index = undefined
    fs.readFile('./server/database/cart.json', 'utf-8', (err, data) => {
        if (!err) {
            cart = JSON.parse(data)
            cart.contents.forEach((e, i) => {
                if (e.id_product === req.params.id){
                    index = i
                }
            })

            if (index !== undefined) delete cart.contents[index]

            fs.writeFile('./server/database/cart.json', JSON.stringify(cart), err => {
                if(!err) {
                    res.json({result: 1})
                } else {
                    res.sendStatus(500)
                }
            })
        } else {
            res.sendStatus(404)
        }
    });
});

module.exports = router;