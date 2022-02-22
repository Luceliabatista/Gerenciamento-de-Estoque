const express = require('express')
const router = express.Router()

const EstoqueController = require('../controllers/EstoqueController')

router.post('/add', EstoqueController.createEstoque)
router.get('/', EstoqueController.showEstoque)
router.get('/edit/:id', EstoqueController.filterEstoque)
router.post('/edit', EstoqueController.sendUpdateEstoque)
router.post('/remove', EstoqueController.removeEstoque)
router.get('/vazio', EstoqueController.geraRelatorioVazio)
router.get('/baixo', EstoqueController.geraRelatorioBaixo)


module.exports =router