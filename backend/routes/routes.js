const express= require('express')
const router = express.Router()

const expenseController = require('../controllers/expenses')
const auth = require('../controllers/auth')
router.post('/', auth, expenseController.getAll)

router.post('/addExpense', auth, expenseController.postExpense)
router.delete('/deleteExpense/:id', auth, expenseController.deleteExpense)
router.post('/edit-expense/:id', auth, expenseController.editExpense)
router.get('/download', auth, expenseController.downloadExpense)
module.exports = router;