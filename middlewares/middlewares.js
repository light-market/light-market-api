const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports= {
    adminMiddleware: function admin(req, res, next) {
        const token = req.header('adminToken');
        if (!token) {
            res.status(401).send({
                message: "Access Denied"
            })
        }
        else {
            jwt.verify(token, process.env.TOKEN_SECRET, function (err, data) {
                if (err) {
                    res.status(401).send({
                        message: "Access Denied"
                    })
                }
                else {
                    if (data.role !== 'admin') {
                        res.status(401).send({
                            message: "Access Denied"
                        })
                    }
                    else {
                        next();
                    }

                }
            })
        }
    }
}
