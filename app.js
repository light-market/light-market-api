const express = require('express')
const mongoose = require('mongoose')
const bodyParcer = require('body-parser')
const app = express()
const port = 3000
const api = '/api'
var cors = require('cors')
app.use(cors())
app.use(bodyParcer.json());
const categories = require('./controllers/category.controller')
const products = require('./controllers/product.controller')

// connection to mongodb
const db = require('./models/index')
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
app.post(api + '/products/:type', products.create)
app.get(api + '/products/:category', products.findAll)
app.delete(api + '/products/:id', products.delete)
app.put(api + '/products/:id', products.update)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))