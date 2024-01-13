const SibApiV3Sdk = require('sib-api-v3-sdk');
const User = require('../models/signup')
const forgotPass = require('../models/forgotPass');
const uuid = require('uuid')
const bcrypt = require('bcrypt')
require('dotenv').config();

exports.forgotEmail =async (req, res) => {
const email = req.body.email;
    const user =await User.findOne({where: { email :email }, attributes: ["name" , "email", "id"]})


    const details = await forgotPass.create({
        id : uuid.v4(),
        userId: user.id,
        isActive: true
    })
    //console.log(details.id)
    //console.log(user)
    const client = SibApiV3Sdk.ApiClient.instance;
    //console.log(client)
    const apiKey = client.authentications['api-key'];
    apiKey.apiKey =process.env.api_key;
    //console.log(apiKey.apiKey)

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    const sender = {
        email:"taiyabak20@gmail.com"
    }

    const receivers = [{
        email: user.email
    }]

    try {
        const sendEmail = await apiInstance.sendTransacEmail({
            sender,
            to: receivers,
            subject: 'For resetting Password',
            htmlContent: '<p>Click the link to reset your password</p>'+
            `<a href="http://3.215.255.202/forgotPass/resetPass.html?reset=${details.id}">click here</a>`,
        })
        
     }
     catch(err){
        console.log(err)
     }
}
    
exports.passResetReq = async (req, res) =>{
    const Resetid = req.params.id;
    //console.log(Resetid)
    try{
        const resetReq = await forgotPass.findOne({
            where : {id: Resetid}
        })
        if(resetReq.isActive){
            //console.log(resetReq)
        return res.status(200).send(resetReq)
    }
        else{
            //console.log(resetReq)
           return res.send(resetReq)
        }
    } 
    catch (err){
        console.log(err)
    }
}
exports.changePass = async(req, res) =>{
    const newPass = req.body.newPass;
    const id = req.params.id;
    const resetUser = await forgotPass.findByPk(id);
    //console.log(resetUser)
    const user =  await resetUser.getUser()
    //console.log(user.password)
    const hashPass = await bcrypt.hash(newPass,10)
    //console.log(hashPass)
    await user.update({password : hashPass})
    await resetUser.update({isActive : false})
    return res.json('Password changed')
}