let mong = require('mongoose')
let Schema = mong.Schema

let cartSchema = new Schema ({
    items: { type: Array, required: false, default: [] },
    user_id: { type: String, required: true },
})

module.exports = mong.model('cart', cartSchema)