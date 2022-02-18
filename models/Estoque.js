const { model, Schema } = require("mongoose");

const Estoque = model(
    "Estoque",
    new Schema({
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        quantity: { type: Number, required: true },
        category: { type: String, required: true }
    })
);

module.exports = Estoque;