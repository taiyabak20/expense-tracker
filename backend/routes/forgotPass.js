const express = require('express');
const router = express.Router()
const forgotPassController = require('../controllers/forgotPass')
router.post('/called/password/forgotpassword',forgotPassController.forgotEmail)

module.exports = router