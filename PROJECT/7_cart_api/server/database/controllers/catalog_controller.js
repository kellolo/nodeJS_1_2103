let Products = require('../models/products.js')

module.exports = {
    async load(req, res) {
        res.json(await Products.find())
    },
    async create(req, res) {
        try {
            let { name, price } = req.body
            let newItem = await Products.create({
                name, price
            })
            res.json({ _id: newItem._id })
        }
        catch(err) {
            console.log(err)
            res.json({ status: false })
        }
    }
}