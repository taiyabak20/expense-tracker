const express = require('express')
const app = express()
const cors = require('cors')
//const helmet  = require('helmet')
const compression = require('compression')
const morgan = require('morgan')
const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose');

require('dotenv').config()
const bodyParser = require('body-parser')
const expenseRoutes = require('./routes/routes')
const signupRoutes = require('./routes/signup')
const purchaseRoutes = require('./routes/purchase')
const premiumRoutes = require('./routes/premium')
const forgotPassRoutes = require('./routes/forgotPass')
const reportRoutes = require('./routes/report')
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'),
 {flag: 'a'});
app.use(cors())
//app.use(helmet())
app.use(compression())
app.use(morgan('combined', {stream: accessLogStream}))
app.use(express.json())
app.use('/expense', expenseRoutes)
app.use('/signup', signupRoutes)
app.use('/expense/purchase', purchaseRoutes)
app.use('/premium', premiumRoutes)
app.use('/', forgotPassRoutes)
app.use('/report', reportRoutes)
// app.use((req, res) =>{
//     res.sendFile(path.join(__dirname, `../${req.url}`))
// })
app.use(express.static(path.join(__dirname , '..','frontend/')))


mongoose
.connect(process.env.MONOGO_URL)
.then(result =>{
    app.listen(process.env.PORT || 3000);
})
.catch(err =>{
    console.log(err);
})
