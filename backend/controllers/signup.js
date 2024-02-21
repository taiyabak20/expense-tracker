const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config();
exports.createUser = async (req, res) =>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
try {
    const userExist = await User.findOne({
        email
    })

    if(userExist){
        return res.status(400).json('error')
    }
    else{
        const saltrounds = 10;
        bcrypt.hash(password, saltrounds, async(err, hash)=>{
            await User.create({
                name: name,
                email: email,
                password: hash
            })
            console.log(User)
            return res.status(201).json(User);
        })
   }
}
    catch(err){
        res.status(400).send({err: err.message})
    }
    
}

exports.loginUser = async (req, res) =>{
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password)

    try{
        const userExist = await User.findOne({email})
console.log(userExist)
        if(userExist){
            const passwordMatch = await bcrypt.compare(password, userExist.password);
            console.log(password, userExist.password, passwordMatch);
            
            if (passwordMatch) {
                const token = jwt.sign({userId: userExist.id}, process.env.JWT_SECRET);
                
                // const decoded = jwt.decode(token)
                // const verify = jwt.verify(token,  "secret")
                // console.log(token, userExist.id, decoded, verify)
                return res.status(200).json(token);
            } else {
                res.status(401).json('Incorrect password');
            }
        }
        else{
            res.status(404).json('doesnt exists')
        }
    }
    catch(err){
        console.log(err)
    }
}