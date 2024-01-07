const SibApiV3Sdk = require('sib-api-v3-sdk');

exports.forgotEmail =async (req, res) => {
    const client = SibApiV3Sdk.ApiClient.instance;
    const apiKey = client.authentications['api-key'];
    apiKey.apiKey = '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';
    console.log(apiKey.apiKey)

    const apiInstance = new SibApiV3Sdk.EmailCampaignsApi();
    const emailCampaigns = new SibApiV3Sdk.CreateEmailCampaign();

    emailCampaigns.name = "Campaign sent via the API";
    emailCampaigns.subject = "My subject";
    emailCampaigns.sender = {"name": "From name", "email":"taiyabak20@gmail.com"};
    emailCampaigns.type = "classic";
    emailCampaigns.htmlContent = 'Congratulations! You successfully sent this example campaign via the Brevo API.';
    emailCampaigns.recipients = {"listIds": ['tibu0803@gmail.com']};

    apiInstance.createEmailCampaign(emailCampaigns).then(function(data) {
        console.log('API called successfully. Returned data: ' + data);
    }, function(error) {
        console.error(error);
    });
};
