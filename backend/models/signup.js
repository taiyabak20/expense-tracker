const Sequelize = require('sequelize')
const sequelize = require('../utils/db')

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey : true,
        allowNull : false,
        autoIncrement : true,
        
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isPremiumUser: Sequelize.BOOLEAN,
    totalSum : Sequelize.INTEGER
    
})

module.exports = User;
