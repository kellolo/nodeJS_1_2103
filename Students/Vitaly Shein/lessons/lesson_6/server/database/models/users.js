let mong = require('mongoose')
let Schema = mong.Schema

let usersSchema = new Schema ({
    login: { type: String, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean, required: false, default: false },
    cart: { type: String, required: false, default: '' }
})

module.exports = mong.model('users', usersSchema)