exports.update = (req, res) => {

    const token = req.header('accessToken');

    const token = req.header('accessToken');


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
                            status: 'ordered',
                            active: false,

                            totalPrice: req.body.totalPrice,
                            date: Date.now()

                        });
                        cart.save(cart).then(Cdata => {
                            res.send({
                                message: "Card Saved Successfully"
                            })

                        }).catch(err => {

                        }).catch(err => {
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
exports.findAll = (req, res) => {//1
    const token = req.header('accessToken');
    if (!token) {//2
        res.status(401).send({
            message: "Access Denied"
        })
    }//2
    else {//3
        jwt.verify(token, process.env.TOKEN_SECRET, function (err, dataT) {
            if (err) {
                res.status(401).send("Access Denied");
            } else {
                let cart = [];
                let quantities = [];
                Cart.findOne({ userId: dataT.id }).populate("products.productID").then(data => {
                    for (i = 0; i < data.products.length; i++) {
                        cart.push(data.products[i].productID);
                        quantities.push({
                            productID: data.products[i].productID.id,
                            quantity: data.products[i].quantity
                        })
                        for (i = 0; i < data.products.length; i++) {
                            cart.push(data.products[i].productID);
                            quantities.push({
                                productID: data.products[i].productID.id,
                                quantity: data.products[i].quantity

                            })

                        }
                        res.send({

                            cart: cart,
                            quantities: quantities,
                            totalPrice: data.totalPrice
                        })
                        .catch(err => {
                            res.status(400).send({
                                message: "There is error happend"
                            })
                        })
                    }
                })

            }
        })
    }
}
