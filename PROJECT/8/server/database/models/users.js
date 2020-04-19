let mong = require('mongoose')
let Schema = mong.Schema

let productsSchema = new Schema ({
    login: { type: String, required: true },
    password: { type: String, required: true },
    cart: { type: String, required: false, default: '' },
    name: { type: String, required: false, default: '' }
})

module.exports = mong.model('users', productsSchema)