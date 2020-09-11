require('dotenv').config()
const db = require('../models')
const User = db.users;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

function generateAccessToken(email,id) {
    return jwt.sign({email: email ,id:id}, process.env.TOKEN_SECRET);
}
exports.create = async (req, res) => {
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
        return res.status(400).send({
            message: 'Email Already Exist'
        })
    }
    /*const salt = bcrypt.genSalt(10);
    const hashPassword = bcrypt.hash(req.body.password,salt);*/

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash
    });
    user.save(user).then(data => {
        const token = generateAccessToken(data.email,data._id);
        res.send({
            accessToken: token
        });
    }).catch(err => {
        res.status(400).send(err);
    })
}
exports.login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send({
            message: 'Invalid Email Or Password'
        })
    }
    const vaildPass = await bcrypt.compare(req.body.password, user.password);
    if (!vaildPass) {
        return res.status(400).send({
            message: 'Invalid Email Or Password'
        })
    }
    const token = generateAccessToken(user.email ,user._id);
    res.send({
        accessToken: token
    })
}