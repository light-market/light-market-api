const db = require('../models')
const Faq = db.faqs;
const jwt = require('jsonwebtoken')
require('dotenv').config()
const middlewares = require('../middlewares/middlewares')
//create new faq
exports.create = (req, res) => {
    const faq = new Faq({
        question: req.body.question,
        answer: "",
        author: req.body.author,
        specialist: "",
        isShown: false
    });
    faq.save(faq).then(data => {
        res.send({
            message: "Question is Sent to Specialist Wait for Respone on FAQ page"
        })
    }).catch(err => {
        res.send({
            message: "There is error in saving FAQ"
        })
    })
}
// reterive questions for admin 
exports.findAll = (req, res) => {
    const token = req.header('adminToken');
    if (!token) {
        Faq.find({ isShown: true }).then(data => {
            res.send(data)
        }).catch(err => {
            res.send({
                message: "There Is Error In Retreveing Questions"
            })
        })
    }
    else {
<<<<<<< HEAD
        jwt.verify(token, process.env.TOKEN_SECRET, function (err, data) {
            if (err) {
                Faq.find({ isShown: true }).then(data => {
                    res.send(data)
                }).catch(err => {
                    res.send({
                        message: "There Is Error In Retreveing Questions"
                    })
                })
            }
            else {
                if (data.role !== 'admin') {
                    Faq.find({ isShown: true }).then(data => {
                        res.send(data)
                    }).catch(err => {
                        res.send({
                            message: "There Is Error In Retreveing Questions"
                        })
                    })
                }
                else {
                    Faq.find({ isShown: false }).then(data => {
                        res.send(data)
                    }).catch(err => {
                        res.send({
                            message: "There Is Error In Retreveing Questions"
                        })
                    })
=======
        Faq.find({ isShown: true }).skip(offset).limit(limit).then(data => {
            res.send(data)
        }).catch(err => {
            res.send({
                message: "There Is Error In Retreveing Questions"
                
            })
        })
>>>>>>> 863a73fba888530dac1a8779e040fb333b1b8177

                }
            }

        })
    }

}
// update question 
exports.update = (req, res) => {
    if (!req.body) {
        res.send({
            message: "Data To Update Can Not Be Empty!"
        })
    }
    const id = req.params.id;
    Faq.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.send({
                message: `Cannot Update question With ID=${id}. Maybe question Was Not Found!`
            })
        }
        else {
            res.send({
                message: "Question Updated Successfully"
            })
        }
    }).catch(err => {
        res.send({
            message: "Error updating Product with ID=" + id
        })
    })

}
//delete question 
exports.delete = (req, res) => {
    const id = req.params.id;
    Faq.findByIdAndRemove(id).then(data => {
        if (!data) {
            res.send({
                message: `Cannot Delete Question With ID=${id}. Maybe Question Was Not Found!`
            });
        }
        else {
            res.send({
                message: "Question Deleted Successfully"
            })
        }
    }).catch(err => {
        res.send({
            message: `Cannot Delete Question. Maybe Question Was Not Found!`
        })
    })
}
