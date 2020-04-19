let Carts = require('../models/cart.js')

module.exports = {
    async load(req, res) {
        let newCart = await Carts.find({ user_id: req.params.id })

        if(!newCart.length) {
            newCart.push(await Carts.create({
                user_id: req.params.id,
                items: []
            }))
        }
        res.json(newCart[0])
    },
    async add(req, res) {
        try {
            let cart = await Carts.find({ user_id: req.params.id })
            cart = cart[0]

            let items = cart.items

            items.push(req.body)

            await cart.updateOne({ items: items })
            res.json({ result: 'success' })
        }
        catch(err) {
            console.log('cart-add ', err)
            res.json({error: err})
        }
    },
    async change (req, res) {
        try {
            let cart = await Carts.find({ user_id: req.params.id })
            cart = cart[0]

            let items = cart.items

            let find = items.find(el => el._id == req.body._id)
            find.quantity += req.body.delta

            await cart.updateOne({ items: items })
            res.json({ result: 'success', operation: req.body.delta === -1 ? 'remove' : 'add' })
        }
        catch(err) {
            console.log('cart-add ', err)
            res.json({error: err})
        }
    }
}