let express = require('express') //DOC express
let fs = require('fs') //filestream //DOC node JS
const http = require ('http')
let app = express()


//db
let db = require('mongoose')
db.connect('mongodb://localhost/geekshop', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//controllers
let CatalogController = require('./database/controllers/catalog_controller.js')
let CartController = require('./database/controllers/cart_controller.js')
let MsgController = require('./database/controllers/msg_controller.js')
let auth = require('./database/controllers/auth.js')

//routers
//let cartRouter = require('./router/old_cart_router')
let cartRouter = require('./router/cart_router')


//use
app.use(express.json())
let server = http.Server(app)
const socketIO = require ('socket.io')
let msgServer = socketIO(server)
// server.use('/cart', cartRouter)

app.get('/shop', CatalogController.load)
app.post('/catalog', CatalogController.create)
app.get('/cart/:id', CartController.load)
app.get('/messages/:id', MsgController.load)

app.post('/auth', auth.login)
app.post('/auth/create', auth.create)
app.post('/cart/:id', CartController.add)
app.put('/cart/:id', CartController.change)

msgServer.on ('connection', (socket) => {
    socket.on('send', async (msg) => {
        MsgController.send(msg)
        .then (payload => {
            let {status, message} = payload
            if (status) {
                socket.emit('send', message)
                return message
            }
        })
        .then(m => {
            MsgController.receive(m)
            .then (payload => {
                if (payload) {
                    socket.emit('receive', m)
                }
            })
        })
    })
})

server.listen(8080, () => { console.log('server is ON @ 8080') })