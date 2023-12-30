const user = require('../models/signup')
const bcrypt = require('bcrypt');

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
        const saltrounds = 10;
        bcrypt.hash(password, saltrounds, async(err, hash)=>{
            await user.create({
                name: name,
                email: email,
                password: hash
            })
            console.log(user)
            return res.status(201).json(user);
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

    try{
        const userExist = await user.findOne({where: {email: email}})

        if(userExist){
            const passwordMatch = await bcrypt.compare(password, userExist.password);
            console.log(password, userExist.password, passwordMatch);
            
            if (passwordMatch) {

                res.status(200).json('Login successful');
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