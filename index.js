require('dotenv/config')
require('./db')
const Estoque = require('./models/Estoque')
const estoqueRoutes = require('./routes/estoquesRoutes')



const express = require('express')
const app = express();


app.use(express.json()); 
app.use(express.urlencoded({extended: true}))
app.use('/estoque', estoqueRoutes )


app.listen(3000)
