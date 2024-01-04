const express= require('express')
const router = express.Router()

const expenses = require('../models/expenses')
const expenseController = require('../controllers/expenses')
const auth = require('../controllers/auth')
router.get('/', auth, expenseController.getAll)

router.post('/addExpense', auth, expenseController.postExpense)
router.delete('/deleteExpense/:id', auth, expenseController.deleteExpense)
router.post('/edit-expense/:id', auth, expenseController.editExpense)

module.exports = router;