const express = require('express')
const router = express.Router()
const signupController = require('../controllers/signup')

router.post('/addUser', signupController.createUser )
router.post('/user', signupController.loginUser)

module.exports = router