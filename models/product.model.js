const { mongoose } = require(".");

module.exports = mongoose => {
    const Product = mongoose.model(
        "product", mongoose.Schema({
            type: String,
            name: String,
            description: String,
            imageUrl: String,
            quantity: Number,
            price: Number,
            secondPrice: Number
        })
    )
    return Product;
}