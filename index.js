require('dotenv/config') //Definindo variavel de ambiente
require('./db')

const express = require('express')
const app = express();

// app.use(express.urlencoded({ extended: true })); //Url fica dentro do código
app.use(express.json()); //Aplicação consegue ler json

// const routes = require('./routes')
// app.use(routes)

app.listen(3000);