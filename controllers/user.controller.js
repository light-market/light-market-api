require('dotenv').config()
const db = require('../models')
const User = db.users;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

function generateAccessToken(username,email){
    return jwt.sign({username : username , email:email},process.env.TOKEN_SECRET,{expiresIn:'15m'});
}
exports.create = async(req, res) => {
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
        return res.status(400).send({
            message: 'Email Already Exist'
        })
    }
    /*const salt = bcrypt.genSalt(10);
    const hashPassword = bcrypt.hash(req.body.password,salt);*/
    const salt =10;
    bcrypt.genSalt(salt,function(err,salt){
        bcrypt.hash(req.body.password,salt,function(err,hash){
            const hashPassword= hash
        })
    })
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword
    });
    user.save(user).then(data => {
        const token=generateAccessToken(data.username,data.email);
        res.send({
            accessToken : token 
        });
    }).catch(err => {
        res.status(400).send(err);
    })
}
exports.login = async(req,res)=>{
    const user = await User.findOne({email:req.body.email});
    if (!user) {
        res.status(400).send({
            message : 'Invalid Email Or Password'
        })
    }
    const vaildPass = await bcrypt.compare(req.body.password,user.password);
    if(!vaildPass){
        res.status(400).send({
            message : 'Invalid Email Or Password' 
        })
    }
    const token=generateAccessToken(user.username,user.email);
    res.send({
        accessToken : token
    })
}