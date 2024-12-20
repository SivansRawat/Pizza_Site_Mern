const mongoose = require("mongoose");

const pizzaSchema = mongoose.Schema({
    name: { type: String, required: true },
    varients: { type: [String], required: true },
    prices: { type: Array, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true }
}, {
    timestamps:true,
})

const pizzaModel = mongoose.model('pizzas' , pizzaSchema)

module.exports = pizzaModel