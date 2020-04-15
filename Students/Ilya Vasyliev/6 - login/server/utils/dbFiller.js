let db = require('mongoose')
let fs = require('fs')

let catalogData = './server/utils/catalog.json'
let cartData = './server/utils/cart.json'

let Products = require('../database/models/products.js')

db.connect('mongodb://localhost/geekshop', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

function readJSON(file) {
 return new Promise((res, rej) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if(!err) {
            res(JSON.parse(data))
        } else {
            rej('cant get data for fill at ' + file)
        }
    })
 })
}

async function writeCollection(array) {
    await array.forEach(async item => {
        try {
            let newProduct = await Products.create({
                name: item.product_name,
                price: item.price,
                img: item.img ? item.img : 'default'
            })
            console.log(newProduct.name + ' added')
        }
        catch(err) {
            console.log(err)
        }
    })
}

readJSON(catalogData)
.then(arr => {
    writeCollection(arr)
})
.catch(err => {
    console.log(err)
})

//cart