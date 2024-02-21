const jwt =  require('jsonwebtoken')
require('dotenv').config();
const User = require('../models/User')

const auth = async(req, res, next) =>{
    try{
        const token = req.headers.auth;
        //console.log("token : " + token)
        const verified = await jwt.verify(token, process.env.JWT_SECRET)
        //console.log(verified)
        const user = await User.findById(verified.userId)
        //console.log(user)
        req.user = user;
        next()
    }
    catch(e){
        console.log(e)
        return res.status(500).json({success : false , msg : "Internal server error"})
    }
}

module.exports = auth;