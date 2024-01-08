const express = require('express');
const router = express.Router()
const forgotPassController = require('../controllers/forgotPass')
router.post('/called/password/forgotpassword',forgotPassController.forgotEmail)
router.get('/resetpassword/:id', forgotPassController.passResetReq)
router.post('/resetpassword/:id', forgotPassController.changePass)

module.exports = router