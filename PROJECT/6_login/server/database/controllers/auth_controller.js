let Users = require('../models/users.js')

module.exports = {
    async login(req, res) {
        try {
            let users = await Users.find({ login: req.body.login, password: req.body.password })

            if (users.length) {
                let user = users[0]
                res.json({ _id: user._id, login: user.login, cart: user.cart })
            } else {
                res.send('Пользователь не найден')
            }
        }
        catch(err) {
            console.log(err)
        }
    },
    async create(req, res) {
        try {
            let { login, password, cart } = req.body
            let newItem = await Users.create({
                login, password, cart
            })
            res.json({ _id: newItem._id })
        }
        catch(err) {
            console.log(err)
            res.json({ status: false })
        }
    } 
}