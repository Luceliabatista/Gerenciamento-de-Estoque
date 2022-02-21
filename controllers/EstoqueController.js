const Estoque = require('../models/Estoque')

module.exports = class EstoqueController {

    static async createEstoque(req, res) {
        const estoque = {
            name: req.body.name,
            price: req.body.price,
            eid: (req.body.name.slice(0, 2) + req.body.category.slice(0, 3)).toUpperCase(),
            description: req.body.description,
            quantity: req.body.quantity,
            category: req.body.category,
            status: true
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

    static async listUpdateEstoque(req, res) {
        const id = req.params.id

        const estoque = await Estoque.findOne({ _id: id })
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
            eid: (req.body.name.slice(0, 2) + req.body.category.slice(0, 3)).toUpperCase(),
            description: req.body.description,
            quantity: req.body.quantity,
            category: req.body.category,
            status: req.body.status
        }
        console.log(estoque)
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

        await Estoque.deleteOne({ _id: id } )

        res.status(202).json({ message: `estoque-${id}-removido` })

    }

    //Relatório de Estoque Vazio
    static async geraRelatorioVazio(req, res) {
        const vazio = 0

        let estoques = await Estoque.find({ quantity: vazio })

        res.status(406).json(estoques)
    }      

     //Relatório de Estoque em baixa
     static async geraRelatorioBaixo(req, res) {
        const estqBaixo = 10
        const vazio = 0

        let estoques = await Estoque.find({ quantity: { $lte: estqBaixo, $gt: vazio } })

        res.status(406).json(estoques)
    }
}
