const SibApiV3Sdk = require('sib-api-v3-sdk');
const User = require('../models/User')
const forgotPass = require('../models/forgotPass');
const uuid = require('uuid')
const bcrypt = require('bcrypt')
require('dotenv').config();

exports.forgotEmail =async (req, res) => {
const email = req.body.email;
    const user = await User.findOne( {email: email} ) 
    .select('name email');

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const details = await forgotPass.create({
        id : uuid.v4(),
        userId: user._id,
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
            `<a href="http://localhost:3000/forgotPass/resetPass.html?reset=${details.id}">click here</a>`,
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
           id: Resetid
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

exports.changePass = async (req, res) => {
    const newPass = req.body.newPass;
    const resetId = req.params.id;

    try {
        const resetReq = await forgotPass.findOne({ id: resetId });

        if (!resetReq) {
            return res.status(404).json({ message: 'Reset request not found' });
        }

        if (!resetReq.isActive) {
            return res.status(400).json({ message: 'Reset request is no longer active' });
        }

        const user = await User.findById(resetReq.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const hashPass = await bcrypt.hash(newPass, 10);
        await user.updateOne({ password: hashPass });

        await resetReq.updateOne({ isActive: false });

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};