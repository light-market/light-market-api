
const product = require('./product.model')
const { Schema } = require("mongoose");

/*module.exports = mongoose => {
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
}*/
module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
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
            fullname: String,
            address: String,
            phone: String,
            date: {
                type: Date,
            },
            deliveryDate: {
                type: Date,
            },
            comments: [{
                type: String
            }]
        }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Cart = mongoose.model("cart", schema);
    return Cart;
};