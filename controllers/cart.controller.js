const db = require('../models')
const Cart = db.carts;
const Product = db.products;
const jwt = require('jsonwebtoken')
//const product = require('../models/product.model')
require('dotenv').config()

exports.findAll = (req, res) => {//1
    const token = req.header('accessToken');
    const ip = req.header('ip');
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, function (err, dataT) {
            Cart.find({ userId: dataT.id, status: 'select' }).populate("products.productID").then(data => {
                res.send(data[0]);
            }).catch(err => {
                res.send(err);
            })

        })
    }
    else if (ip) {
        Cart.findOne({ userId: ip, status: 'select' }).populate("products.productID").then(data => {
            res.send(data);
        }).catch(err => {
            res.send(err);
        })
    }
}
exports.addToCart = (req, res) => {
    const token = req.header('accessToken');
    let found = false;
    let index;
    if (!token) {
        Cart.findOne({ userId: req.body.userId, status: "select" }).then(cart => {
            for (i = 0; i < cart.products.length; i++) {
                if (cart.products[i].productID == req.body.product.id) {
                    found = true;
                    index = i;
                    break;

                }
            }
            if (found) {
                return res.send({
                    message: "This Item added to cart perviously"
                })

            }
            else {
                cart.products.push({
                    productID: req.body.product.id,
                    quantity: 1
                })
                cart.totalPrice += +req.body.product.price;
                Cart.findByIdAndUpdate(cart._id, cart, { useFindAndModify: false }).then(cart => {
                    return res.send({
                        message: "Product Added to Cart",
                    });
                })
            }
        }).catch(err => {
            console.log(req.body.userId)
            const cart = new Cart({
                products: [{
                    productID: req.body.product.id,
                    quantity: 1
                }],
                userId: req.body.userId,
                totalPrice: req.body.product.price,
                date: null,
                deliveryDate: null,
                comments: [],
                status: 'select'
            })
            cart.save(cart).then(cart => {
                return res.send({
                    message: "Product Added to Cart",
                });
            })
        })
    }
    else {
        jwt.verify(token, process.env.TOKEN_SECRET, function (err, data) {
            Cart.findOne({ userId: data.id, status: "select" }).then(cart => {
                for (i = 0; i < cart.products.length; i++) {
                    if (cart.products[i].productID == req.body.id) {
                        found = true;
                        index = i;
                        break;

                    }
                }
                if (found) {
                    return res.send({
                        message: "This Item added to cart perviously"
                    })

                }
                else {
                    cart.products.push({
                        productID: req.body.id,
                        quantity: 1
                    })
                    cart.totalPrice += +req.body.price;
                    Cart.findByIdAndUpdate(cart._id, cart, { useFindAndModify: false }).then(cart => {
                        return res.send({
                            message: "Product Added to Cart",
                        });
                    })
                }
            }).catch(err => {
                const cart = new Cart({
                    products: [{
                        productID: req.body.id,
                        quantity: 1
                    }],
                    userId: data.id,
                    totalPrice: req.body.price,
                    date: null,
                    deliveryDate: null,
                    comments: [],
                    status: 'select'
                })
                cart.save(cart).then(cart => {
                    return res.send({
                        message: "Product Added to Cart",
                    });
                })
            })
        })
    }
}
exports.adminFindAll = (req, res) => {
    Cart.find().populate("products.productID").then(data => {
        res.send(data);
    }).catch(err => {
        res.status(400).send({
            message: 'There is error in retrieveing orders'
        })
    })
}
exports.updateAmount = (req, res) => {
    Cart.findOne({ _id: req.body.cartID }).populate("products.productID").then(cart => {
        for (let i = 0; i < cart.products.length; i++) {

            if (cart.products[i].productID._id == req.body.productID) {
                if (req.body.type === 'add') {
                    cart.products[i].quantity += 1;
                    cart.totalPrice += +req.body.productPrice;
                    break;
                }
                else if (req.body.type === 'minus') {
                    cart.products[i].quantity -= 1;
                    cart.totalPrice -= +req.body.productPrice;
                    break;
                }
                else if (req.body.type === 'delete') {
                    cart.totalPrice = cart.totalPrice - (cart.products[i].quantity * +req.body.productPrice)
                    cart.products.splice(i, 1);
                    break;
                }
            }
        }
        Cart.findByIdAndUpdate(req.body.cartID, cart, { useFindAndModify: false }).then(cartUpdated => {
            res.send(cart)
        })
    })
}
exports.changeID = (req, res) => {
    const token = req.header('accessToken');
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, function (err, data) {
            Cart.findOneAndUpdate({ userId: req.body.ip }, { userId: data.id }, { useFindAndModify: false }).then(data => {
                res.send({ message: "Change ID Successfully" })
            }).catch(err => {
                res.status(400).send({ message: "error happend" })
            })
        })
    }
}
exports.order = (req, res) => {
    const token = req.header('accessToken');
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, function (err, data) {
            Cart.findOneAndUpdate({ userId: data.id, status: 'select' }, { status: 'orderd', date: Date.now(), fullname: req.body.cart.fullname, address: req.body.cart.address, phone: req.body.cart.phone }, { useFindAndModify: false }).populate("products.productID").then(cart => {
                let products = req.body.cart.products;
                console.log(products)
                for (let i = 0; i < products.length; i++) {
                    console.log(i)
                    Product.findOneAndUpdate({ _id: products[i].productID._id }, { quantity: products[i].productID.quantity - products[i].quantity }, { useFindAndModify: false }).then(res => {
                        console.log(res)
                    })
                }
                res.send({ message: "Please Wait till admin verify order" })
            }).catch(err => {
                res.status(400).send({ message: "error happend" })
            })
        })
    }
}
exports.setDate = (req, res) => {
    Cart.findOneAndUpdate({ _id: req.body.id }, { deliveryDate: req.body.date, status: 'delivering' }, { useFindAndModify: false }).then(data => {
        res.send({ message: 'Cart Updated Successfully' })
    }).catch(err => {
        res.status(400).send({
            message: "error happend"
        })
    })
}
exports.remove = (req, res) => {
    const id = req.params.id;
    Cart.findByIdAndRemove(id).then(data => {
        res.send({
            message: "Cart Deleted Successfully"
        })
    }).catch(err => {
        res.status(400).send({
            message: "Cannot Delete Cart There Is Error Happend"
        })
    })
}
exports.findOrders = (req, res) => {
    const token = req.header('accessToken');
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, function (err, data) {
            Cart.find({ userId: data.id, status: { $ne: 'select' } }).populate("products.productID").then(data => {
                res.send(data);
            }).catch(err => {
                res.status(400).send({
                    message: "error happend"
                })
            })
        })
    }
}
exports.setDeliverd = (req,res)=>{
    const id = req.params.id;
    Cart.findOneAndUpdate({ _id: id }, {status: 'delivered' }, { useFindAndModify: false }).then(data => {
        res.send({
            message: "Cart updated Successfully"
        })
    }).catch(err => {
        res.status(400).send({
            message: "Cannot update Cart There Is Error Happend"
        })
    })

}
