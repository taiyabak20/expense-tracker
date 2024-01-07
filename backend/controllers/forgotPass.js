const SibApiV3Sdk = require('sib-api-v3-sdk');

exports.forgotEmail =async (req, res) => {
    const client = SibApiV3Sdk.ApiClient.instance;
    //console.log(client)
    const apiKey = client.authentications['api-key'];
    apiKey.apiKey =`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`;
    console.log(apiKey.apiKey)

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    const sender = {
        email:"taiyabak20@gmail.com"
    }

    const receivers = [{
        email:"tibu0803@gmail.com"
    }]

    try {
        const sendEmail = await apiInstance.sendTransacEmail({
            sender,
            to: receivers,
            subject: 'fsdfsf',
TextContent: 'dassfsd'
        })
     }
     catch(err){
        console.log(err)
     }}
    