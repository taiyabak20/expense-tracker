const jwt =  require('jsonwebtoken')

const User = require('../models/signup')

const auth = async(req, res, next) =>{
    try{
        const token = req.headers.auth;
        //console.log("token : " + token)
        const verified = await jwt.verify(token, "secret")
        //console.log(verified)
        const user = await User.findByPk(verified.userId)
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