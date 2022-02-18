const Estoque = require('../models/Estoque')

module.exports = class EstoqueController {

    static async createEstoque(req, res){
        const estoque = {
        name: req.body.name,
        price:req.body.price,
        eid: (req.body.name.slice(0,2)+req.body.category.slice(0,3)).toUpperCase(),        
        description: req.body.description,
        quantity: req.body.quantity,
        category:req.body.category,
        status:true 
    }

    await Estoque.create(estoque)

    if(!Estoque){
        res.status(402).json({message:'estoque-parâmetros-null'})
        return
    }

    res.status(201).json({message:`estoque- ${estoque.name} -criado`})
}
    static async showEstoque(req, res){
        const estoque = await Estoque.findAll({raw:true})

        if(!estoque){
            res.status(402).json({message:'lista-estoque-parametro-nulo'})
            return
        }
        res.status(202).json(estoque)
    }

    static async listUpdateEstoque(req, res){
        const id = req.params.id

        const estoque = await Estoque.findOne({where: {id:id}})

        if (!estoque){
            res.status(406).json({message: 'parametro-estoque-inconsistente'})
            return
        }
        res.status(200).json(estoque)
        }

        static async sendUpdateEstoque(req, res){
            const id = req.body.id
            const estoque = {
                name: req.body.name,
                price:req.body.price,
                eid: (req.body.name.slice(0,2)+req.body.category.slice(0,3)).toUpperCase(),        
                description: req.body.description,
                quantity: req.body.quantity,
                category:req.body.category,
                status:req.body.status
            }
            console.log(estoque)
            await Estoque.update(estoque, {where:{id:id}})

            if(!estoque){
                res.status(402).json({message:'estoque-parametros-null'})
                return
            }

            res.status(200).json({message: `estoque-${id}-alterado`})

        }

        static async removeEstoque(req, res){
            const id = req.body.id

            if (!id){
                res.status(402).json({message:'estoque-id-parametro-nulo'})
                return
            }

            await Estoque.destroy({where: {id:id}})

            res.status(202).json({message:`estoque-${id}-removido`})

        }

}
