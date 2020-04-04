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
    let content = null
    fs.readFile('./server/database/cart.json', 'utf-8', (err, data) => {
        if (!err) {
            content = JSON.parse(data);
            //здесь
            content.contents.push(req.body);
            //здесь
            fs.writeFile('./server/database/cart.json', JSON.stringify(content), err => {
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

router.put('/:id', function(req, res, next) {

    let content = null;
    let delta = req.body.delta;

    fs.readFile('./server/database/cart.json', 'utf-8', (err, data) => {
        if (!err) {

            content = JSON.parse(data);
            content.contents[req.params.id - 1].quantity += req.body.delta;
            
            fs.writeFile('./server/database/cart.json', JSON.stringify(content), err => {
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

router.delete('/:id', function(req, res) {
    let content = null;
    fs.readFile('./server/database/cart.json', 'utf-8', (err, data) => {
        if (!err) {
            content = JSON.parse(data);
            content.contents.splice((req.params.id - 1), 1);
            fs.writeFile('./server/database/cart.json', JSON.stringify(content), err => {
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