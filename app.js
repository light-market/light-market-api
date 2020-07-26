const express = require('express')
const app = express()
const port = 3000
const api = '/api'

app.get('/', (req, res) => res.send('Hello World!'))
app.get(api+'/categories', (req, res) => res.send({name : 'Ali'}))
app.get(api+'/products', (req, res) => res.send('Hello products!'))
app.get(api+'/cart', (req, res) => res.send('Hello cart!'))
app.get(api+'/faq', (req, res) => res.send('Hello faq!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))