const db = require('../models')
const Category = db.categories;

//create new category
exports.create = (req, res) => {
    const category = new Category({
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        slag: req.body.slag
    })
    category.save(category).then(data => {
        res.send(data);
    }).catch(err => {
        res.send({
            message: "There Is Error In Saving Category"
            
        })
    })

}
// retrieve categories
exports.findAll = (req, res) => {
    Category.find({}).then(data => {
        res.send(data)
    }).catch(err => {
        res.send({
            message: "There Is Error In Retreveing Categories"
        })
    })
}
// remove category
exports.delete = (req, res) => {
    const id = req.params.id;
    Category.findByIdAndRemove(id).then(data => {
        if (!data) {
            res.send({
                message: `Cannot Delete Category With ID=${id}. Maybe Category Was Not Found!`
            });
        }
        else {
            res.send({
                message: "Category Deleted Successfully"
            })
        }
    }).catch(err => {
        res.send({
            message: "Cannot Delete Category"
        })
    })
}
