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
<<<<<<< HEAD
const faqs = require('./controllers/faq.controller')
const users = require('./controllers/user.controller')
const carts = require('./controllers/cart.controller')
const middlewares = require('./middlewares/middlewares')
=======
const faqs =require('./controllers/faq.controller')


>>>>>>> 863a73fba888530dac1a8779e040fb333b1b8177
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
app.post(api + '/categories', categories.create)
app.get(api + '/categories', categories.findAll)
app.delete(api + '/categories/:id', categories.delete)

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
app.post(api + '/cart', carts.update)
app.get(api + '/cart', carts.findAll)
app.get(api +'/cart-admin',middlewares.adminMiddleware,carts.adminFindAll)


// Production

/*app.listen(port,'0.0.0.0',()=>{
    console.log("server is listening on "+port+" port");
})*/

app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})