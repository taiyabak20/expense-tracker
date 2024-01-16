const express = require('express')
const router = express.Router()
const reportControllers = require('../controllers/report')
const auth = require('../middlewares/auth')
router.post('/today',auth , reportControllers.dataByDate)
router.post('/month',auth , reportControllers.dataByMonth)
router.post('/year',auth , reportControllers.dataByYear)


module.exports = router