const db = require('../models')
const Category = db.categories;

//create new category
exports.create = (req, res) => {
    const category = new Category({
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        describtion : req.body.describtion,
        slag: req.body.slag
    })
    category.save(category).then(data => {
        res.send({
            message : 'Category Saved Successfully'
        });
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
exports.update = (req,res)=>{
    if (!req.body) {
        res.send({
            message: "Data To Update Can Not Be Empty!"
        })
    }
    const id = req.body.category.id
    Category.findByIdAndUpdate(id, req.body.category, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.send({
                message: `Cannot Category Product With ID=${id}. Maybe Product Was Not Found!`
            })
        }
        else {
            res.send({
                message: "Category Updated Successfully"
            })
        }
    }).catch(err => {
        res.send({
            message: "Error updating Category with ID=" + id
        })
    })
}
