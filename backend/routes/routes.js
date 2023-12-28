const express= require('express')
const router = express.Router()

const expenses = require('../models/expenses')
const expenseController = require('../controllers/expenses')

router.get('/', expenseController.getAll)

router.post('/', expenseController.postExpense)
router.delete('/deleteExpense/:id', expenseController.deleteExpense)
router.post('/edit-expense/:id', expenseController.editExpense)

module.exports = router;