let findItem = (arr, id) => arr.find(item => item._id == id)

let cart = {
    change(req, oldCart) {
        let id = req.params.id
        let find = findItem(oldCart.contents, +id)
        find.quantity += +req.body.delta //(1/ -1)
        return oldCart
    }, 
    add(req, oldCart) {
        oldCart.contents.push(req.body)
        return oldCart
    },
    delete(req, oldCart) {
        let id = req.params.id
        let find = findItem(oldCart.contents, id)
        oldCart.contents.splice(oldCart.contents.indexOf(find), 1)
        return oldCart
    }
}

module.exports = cart