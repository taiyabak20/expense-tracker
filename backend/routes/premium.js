const premiumController = require('../controllers/premium')
const express = require('express')
const router = express.Router()

router.get('/', premiumController.showLeaderBoard)

module.exports = router;