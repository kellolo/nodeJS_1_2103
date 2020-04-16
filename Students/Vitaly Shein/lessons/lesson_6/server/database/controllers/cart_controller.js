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
    }
}