const express = require('express')

const router = express.Router()

const auth = require('../middlewares/auth')
const paymentsController = require('../controllers/purchase')

router.get('/premium' ,auth ,paymentsController.purchasePremium)

router.post('/updateTransaction' , auth , paymentsController.successfullTransaction)

router.post('/failed' , auth ,paymentsController.failedTransaction)

module.exports = router;