const user = require('../models/signup')

exports.createUser = async (req, res) =>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
try {
    const userExist = await user.findOne({
        where : {email: email}
    })

    if(userExist){
        return res.status(400).json('error')
    }
    else{
    await user.create({
        name: name,
        email: email,
        password: password
    })
    console.log(user)
    return res.json(user)}
}
    catch(err){
        res.status(400).send({err: err.message})
    }
    
}