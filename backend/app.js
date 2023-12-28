const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const sequelize = require('../not used/db')
const expenseRoutes = require('./routes/routes')
const signupRoutes = require('./routes/signup')

app.use(cors())
app.use(express.json())
app.use('/expense', expenseRoutes)
app.use('/signup', signupRoutes)

sequelize
.sync()
// .sync({force: true})
.then(result => {
    app.listen(3000); 
    console.log('app is running')
})
.catch(err => console.log(err))
