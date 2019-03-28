const express = require('express')
require('dotenv').config()
const massive = require('massive')
const app = express()
const {SERVER_PORT, CONNECTION_STRING} = process.env
const ctrl = require('./controllers/products_controller')
app.use(express.json())

massive(CONNECTION_STRING).then((db) => {
    app.set('db', db)
    console.log(db.listTables())
}).catch(err => console.log('error:', err))

app.get('/api/products', ctrl.getAll)
app.get('/api/products/:id', ctrl.getOne)
app.put('/api/products/:id', ctrl.update)
app.post('/api/products', ctrl.create)
app.delete('/api/products/:id', ctrl.delete)

app.listen(SERVER_PORT, () => console.log(`listen linda on ${SERVER_PORT}`)) 