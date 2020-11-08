const { mongoose } = require(".");
const product = require('./product.model')
const { Schema } = require("mongoose");

module.exports = mongoose => {
    const Cart = mongoose.model(
        "cart", mongoose.Schema({
            userId: String,
            products: [{
                quantity: Number,
                productID: {
                    type: Schema.Types.ObjectId,
                    ref: "product"
                }
            }],
            status: String,
            totalPrice: Number,
            date: {
                type: Date,
            },
            deliveryDate: {
                type: Date,
            },
            comments: [{
                type: String
            }]
        })
    )
    return Cart;
}