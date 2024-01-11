const express = require('express')
const app = express()
const cors = require('cors')

const bodyParser = require('body-parser')
const sequelize = require('./utils/db')
const expenseRoutes = require('./routes/routes')
const signupRoutes = require('./routes/signup')
const purchaseRoutes = require('./routes/purchase')
const premiumRoutes = require('./routes/premium')
const forgotPassRoutes = require('./routes/forgotPass')
const reportRoutes = require('./routes/report')
const User = require('./models/signup')
const Expense = require('./models/expenses')
const Order = require('./models/orders')
const ForgotPasswordRequests = require('./models/forgotPass')
const Downloadedfiles = require('./models/filesDownloaded')
app.use(cors())

app.use(express.json())
app.use('/expense', expenseRoutes)
app.use('/signup', signupRoutes)
app.use('/expense/purchase', purchaseRoutes)
app.use('/premium', premiumRoutes)
app.use('/', forgotPassRoutes)
app.use('/report', reportRoutes)
User.hasMany(Expense);
Expense.belongsTo(User)
User.hasMany(Order)
Order.belongsTo(User)
User.hasMany(ForgotPasswordRequests)
ForgotPasswordRequests.belongsTo(User)
User.hasMany(Downloadedfiles);
Downloadedfiles.belongsTo(User)

sequelize
.sync()
// .sync({force: true})
.then(result => {
    app.listen(3000); 
    console.log('app is running')
})
.catch(err => console.log(err))