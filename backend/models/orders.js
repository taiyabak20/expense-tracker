const Sequelize = require('sequelize')

const sequelize = require('../not used/db')

const Order = sequelize.define('order' , {
    id : {
        type : Sequelize.INTEGER,
        autoIncrement  : true , 
        primaryKey : true,
        allowNull : false

    },
    orderId : Sequelize.STRING,
    paymentId : Sequelize.STRING,
    status : Sequelize.STRING
})

module.exports = Order;