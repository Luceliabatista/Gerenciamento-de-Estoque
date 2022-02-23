const Estoque = require('../models/Estoque')

module.exports = class EstoqueController {
    // CRUD
    static async createEstoque(req, res) { 
        const estoque = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            quantity: req.body.quantity,
            category: req.body.category,
        }

        await Estoque.create(estoque)

        if (!Estoque) {
            res.status(402).json({ message: 'estoque-parâmetros-null' })
            return
        }

        res.status(201).json({ message: `estoque- ${estoque.name} -criado` })
    }

    static async showEstoque(req, res) {
        const estoque = await Estoque.find({ raw: true })

        if (!estoque) {
            res.status(402).json({ message: 'lista-estoque-parametro-nulo' })
            return
        }
        res.status(202).json(estoque)
    }

    static async filterEstoque(req, res) {
        const category = req.params.category

        const estoque = await Estoque.find({ category: category })
        if (!estoque) {
            res.status(406).json({ message: 'parametro-estoque-inconsistente' })
            return
        }
        res.status(200).json(estoque)
    }

    static async sendUpdateEstoque(req, res) {
        const id = req.body._id
        const estoque = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            quantity: req.body.quantity,
            category: req.body.category,
        }
        await Estoque.updateOne({ _id: id }, estoque)
        if (!estoque) {
            res.status(402).json({ message: 'estoque-parametros-null' })
            return
        }

        res.status(200).json({ message: `estoque-${estoque.name}-alterado` })

    }

    static async removeEstoque(req, res) {
        const id = req.body._id

        if (!id) {
            res.status(402).json({ message: 'estoque-id-parametro-nulo' })
            return
        }

        await Estoque.deleteOne({ _id: id })

        res.status(200).json({ message: `estoque-${id}-removido` })

    }

    //Relatório de Estoque Vazio
    static async geraRelatorioVazio(req, res) {
        
        const semEstoque = 0
        let estoques = await Estoque.find({ quantity: semEstoque })
         
        if (estoques.length == 0) {
            res.status(417).json({ message: `estoques-abastecidos` })
            return
        }  
        res.status(200).json(estoques)           
    }

    //Relatório de Estoque Baixo
    static async geraRelatorioBaixo(req, res) {
        const estoqueBaixo = 10
        const semEstoque = 0

        let estoques = await Estoque.find({ quantity: { $lte: estoqueBaixo, $gt: semEstoque } })

        if (estoques.length == 0) {
            res.status(417).json({ message: `estoques-abastecidos` })
            return
        }
        res.status(200).json(estoques)
    }
}

