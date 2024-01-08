const Sequelize = require('sequelize')
const sequelize = require('../not used/db')

const ForgotPasswordRequests = sequelize.define('ForgotPasswordRequests',{
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true        
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        
    },
    isActive: {
        type: Sequelize.BOOLEAN
    }
})

module.exports = ForgotPasswordRequests;