let Users = require('../models/users.js')

module.exports = {
    async login(req, res) {
        try {
            let u = await Users.find({login: req.body.login, password: req.body.password})
            if (u.length) {
                let user = u[0]
                if (user.password === req.body.password) {
                    console.log(user)
                    res.json({ _id: user._id, login: user.login, cart: user.cart, name: user.name, admin: user.admin })
                }
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
            res.json({_id: newItem._id})
        }
        catch(err) {
            res.json({status: false})
        }
    }
}