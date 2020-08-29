const db = require('../models');
const Product = db.products;

//create new product 
exports.create = (req, res) => {
    //req.body all
    const product = new Product({
        type: req.params.type,
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        quantity: req.body.quantity,
        price: req.body.price,
        secondPrice: req.body.secondPrice
    })
    product.save(product).then(data => {
        res.send(data);
    }).catch(err => {
        //search most common http status code
        res.status(400).send({
            message: "There Is Error In Saving Product"+err
        })
    })
}
//retreive category products
exports.findAll = (req, res) => {
    const type = req.params.category;
    const offset = +req.query.offset;
    const limit = +req.query.limit;
    Product.find({ type: type }).skip(offset).limit(limit).then(data => {
        res.send(data)
    }).catch(err => {
        res.send({
            message: err.message || "there is error in reteriving categories"
        })
    })
}

//delete product by id 
exports.delete = (req, res) => {
    const id = req.params.id;
    Product.findByIdAndRemove(id).then(data => {
        if (!data) {
            res.send({
                message: `Cannot Delete Product With ID=${id}. Maybe Product Was Not Found!`
            });
        }
        else {
            res.send({
                message: "Product Deleted Successfully"
            })
        }
    }).catch(err => {
        res.send({
            message: "Cannot Delete Product"
        })
    })
}
// update product by id
exports.update = (req, res) => {
    if (!req.body) {
        res.send({
            message: "Data To Update Can Not Be Empty!"
        })
    }
    const id = req.params.id;
    Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.send({
                message: `Cannot Update Product With ID=${id}. Maybe Product Was Not Found!`
            })
        }
        else {
            res.send({
                message: "Product Updated Successfully"
            })
        }
    }).catch(err => {
        res.send({
            message: "Error updating Product with ID=" + id
        })
    })
}