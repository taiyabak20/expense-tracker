const express = require('express')
const app = express()
const cors = require('cors')

const bodyParser = require('body-parser')
const sequelize = require('./not used/db')
const expenseRoutes = require('./routes/routes')
const signupRoutes = require('./routes/signup')
const purchaseRoutes = require('./routes/purchase')
const User = require('./models/signup')
const Expense = require('./models/expenses')
const Order = require('./models/orders')
app.use(cors())

app.use(express.json())
app.use('/expense', expenseRoutes)
app.use('/signup', signupRoutes)
app.use('/expense/purchase', purchaseRoutes)

User.hasMany(Expense);
Expense.belongsTo(User)
User.hasMany(Order)
Order.belongsTo(User)
sequelize
.sync()
// .sync({force: true})
.then(result => {
    app.listen(3000); 
    console.log('app is running')
})
.catch(err => console.log(err))
