require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParcer = require('body-parser')
const jwt = require('jsonwebtoken')
const app = express()
const port = process.env.PORT || 3000;
const api = '/api'
var cors = require('cors')
app.use(cors())
app.use(bodyParcer.json());
const categories = require('./controllers/category.controller')
const products = require('./controllers/product.controller')
const faqs = require('./controllers/faq.controller')
const users = require('./controllers/user.controller')
const carts = require('./controllers/cart.controller')
const middlewares = require('./middlewares/middlewares')




// connection to mongodb
const db = require('./models/index')
const { adminMiddleware } = require('./middlewares/middlewares')
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to database");
}).catch(err => {
    console.log("Cannot connect to database", err);
    process.exit();
});

app.get('/', (req, res) => res.send('Hello World!'))

//categories apis
app.post(api + '/categories',middlewares.adminMiddleware, categories.create)
app.get(api + '/categories', categories.findAll)
app.delete(api + '/categories/:id',middlewares.adminMiddleware,categories.delete)
app.put(api + '/categories',middlewares.adminMiddleware,categories.update)

//products apis
app.post(api + '/products/:type', middlewares.adminMiddleware, products.create)
app.get(api + '/products/:category', products.findAll)
app.get(api + '/products-admin/:category', middlewares.adminMiddleware, products.findAllAdmin)
app.delete(api + '/products/:id', middlewares.adminMiddleware, products.delete)
app.put(api + '/products/:id', middlewares.adminMiddleware, products.update)

//faq apis
app.post(api + '/faq', faqs.create)
app.get(api + '/faq', faqs.findAll)
app.put(api + '/faq/:id', middlewares.adminMiddleware, faqs.update)
app.delete(api + '/faq/:id', middlewares.adminMiddleware, faqs.delete)

// users api
app.post(api + '/register', users.create)
app.post(api + '/login', users.login)
// cart api 
app.get(api + '/cart', carts.findAll)
app.post(api + '/cart', carts.addToCart)
app.get(api +'/cart-admin',middlewares.adminMiddleware,carts.adminFindAll)
app.post(api + '/cart-update',carts.updateAmount)
app.put(api + '/cart/editId',carts.changeID)
app.put(api + '/cart',carts.order)
app.put(api + '/cart/deliveryDate',middlewares.adminMiddleware,carts.setDate)
app.delete(api + '/cart/:id',middlewares.adminMiddleware,carts.remove)
app.get(api + '/userOrders',carts.findOrders)
app.put(api +'/orderDelivered/:id',middlewares.adminMiddleware,carts.setDeliverd)

// Production

app.listen(port,'0.0.0.0',()=>{
    console.log("server is listening on "+port+" port");
})
/*
app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})*/