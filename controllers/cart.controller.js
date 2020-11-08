const db = require('../models')
const Cart = db.carts;
const jwt = require('jsonwebtoken')
//const product = require('../models/product.model')
require('dotenv').config()

exports.update = (req, res) => {
<<<<<<< HEAD
    const token = req.header('accessToken');
=======

    const token = req.header('accessToken');
    
>>>>>>> 863a73fba888530dac1a8779e040fb333b1b8177
    if (!token) {
        res.status(401).send("Access Denied");
    } else {

        jwt.verify(token, process.env.TOKEN_SECRET, function (err, data) {
            if (err) {
                res.status(401).send("Access Denied");
            }
            else {
                Cart.findOne({ userId: data.id }).then(fData => {
                    if (!fData) {
                        const cart = new Cart({
                            userId: data.id,
                            products: req.body.products,
<<<<<<< HEAD
                            status: 'ordered',
=======
                            active: false,
>>>>>>> 863a73fba888530dac1a8779e040fb333b1b8177
                            totalPrice: req.body.totalPrice,
                            date: Date.now()

                        });
                        cart.save(cart).then(Cdata => {
                            res.send({
                                message: "Card Saved Successfully"
                            })
<<<<<<< HEAD

                        }).catch(err => {
=======
                            
                        }).catch(err=>{
>>>>>>> 863a73fba888530dac1a8779e040fb333b1b8177
                            res.status(400).send({
                                message: "Error in Saving Cart"
                            })
                        })


                    } else {
                        Cart.findOneAndUpdate({ userId: data.id }, {
                            products: req.body.products,
                            totalPrice: req.body.totalPrice
                        }).then(UData => {
                            res.send({
                                message: "Product Updated Successfully"
                            })
                        }).catch(err => {
                            res.send({
                                message: "There is Error in Updating Cart"
                            })
                        })
                    }
                }).catch(err => {
                    res.send({
                        message: "Error Happened"
                    })
                });
            }

        });




    }
}
exports.findAll = (req, res) => {
    const token = req.header('accessToken');
    if (!token) {
        res.status(401).send({
            message: "Access Denied"
        })
    } else {
        jwt.verify(token, process.env.TOKEN_SECRET, function (err, dataT) {
            if (err) {
                res.status(401).send("Access Denied");
            } else {
                let cart = [];
                let quantities = [];
                Cart.findOne({ userId: dataT.id }).populate("products.productID").then(data => {
<<<<<<< HEAD
                    for (i = 0; i < data.products.length; i++) {
                        cart.push(data.products[i].productID);
                        quantities.push({
                            productID: data.products[i].productID.id,
                            quantity: data.products[i].quantity
=======
                    for (i=0;i<data.products.length;i++){
                        cart.push(data.products[i].productID);
                        quantities.push({
                            productID : data.products[i].productID.id,
                            quantity : data.products[i].quantity
>>>>>>> 863a73fba888530dac1a8779e040fb333b1b8177
                        })

                    }
                    res.send({
<<<<<<< HEAD
                        cart: cart,
                        quantities: quantities,
                        totalPrice: data.totalPrice
                    })
                }).catch(err => {
                    res.status(400).send({
                        message: "There is error happend"
=======
                        cart : cart,
                        quantities : quantities,
                        totalPrice :data.totalPrice
                    })
                }).catch(err => {
                    res.status(400).send({
                        message : "There is error happend"
>>>>>>> 863a73fba888530dac1a8779e040fb333b1b8177
                    })
                })
            }
        })

    }

}
<<<<<<< HEAD
exports.adminFindAll = (req, res) => {
    Cart.find().populate("products.productID").then(data => {
        res.send(data);
    }).catch(err => {
        res.status(400).send({
            message: 'There is error in retrieveing orders'
        })
    })
}
=======
>>>>>>> 863a73fba888530dac1a8779e040fb333b1b8177
