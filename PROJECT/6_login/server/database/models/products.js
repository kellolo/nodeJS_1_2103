let mong = require('mongoose')
let Schema = mong.Schema

let productsSchema = new Schema ({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: false, default: 'default' },
    quantity: { type: Number, required: false }
})

module.exports = mong.model('products', productsSchema)