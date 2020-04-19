let Carts = require('../models/cart.js')

module.exports = {
    async load(req, res) {
        // console.log(req.params.id)
        let newCart = await Carts.find({ user_id: req.params.id })
        if (!newCart.length) {
            newCart.push(await Carts.create({
                user_id: req.params.id,
                items: []
            })
            )
        }
        res.json(newCart[0])
    },
    async add(req, res) {
        try {
            let cart = await Carts.find({ user_id: req.params.id })
            let items = cart[0].items

            items.push(req.body)
            await cart[0].updateOne({items: items})
            res.json({result: 'ok'})
        }
        catch(err) {
            res.json({err: err})
        }
        
    },
    async change(req, res) {
        try {
            let cart = await Carts.find({ user_id: req.params.id })
            let items = cart[0].items
            
            let find = items.find(el => el._id === req.body._id)
            find.quantity += req.body.delta

            await cart[0].updateOne({items: items})
            res.json({result: 'ok'})
        }
        catch(err) {
            console.log(err)
            res.json({err: err})
        }
    }
}