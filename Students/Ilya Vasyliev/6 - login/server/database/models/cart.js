let mong = require('mongoose')
let Schema = mong.Schema

let cartSchema = new Schema ({
    user_id: { type: String, required: true },
    items: { type: Array, required: false, default: [] },
})

module.exports = mong.model('cart', cartSchema)