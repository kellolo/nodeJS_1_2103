let express = require('express') //DOC express
let fs = require('fs') //filestream //DOC node JS
let server = express()

//db
let db = require('mongoose')
db.connect('mongodb://localhost/geekshop', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//controllers
let CatalogController = require('./database/controllers/catalog_controller.js')

//routers
//let cartRouter = require('./router/old_cart_router')
let cartRouter = require('./router/cart_router')


//use
server.use(express.json())
// server.use('/cart', cartRouter)

server.get('/catalog', CatalogController.load)

// server.get('/catalog', (req, res) => {
//     //res.send('Hello User')
//     fs.readFile('./server/database/catalog.json', 'utf-8', (err, data) => {
//         if (!err) {
//             res.send(data)
//         } else {
//             res.sendStatus(404)
//         }
//     })
// }) //http://localhost:8080/
//server.get('/home') //http://localhost:8080/home/


// '/cart'


server.listen(8080, () => { console.log('server is ON @ 8080') })