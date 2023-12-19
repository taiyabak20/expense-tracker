const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const sequelize = require('./db')
const expenseRoutes = require('./routes/routes')

app.use(cors())
app.use(express.json())
app.use('/expense', expenseRoutes)

sequelize.sync().then(result => {
    app.listen(3000); 
    console.log('app is running')
})
.catch(err => console.log(err))
