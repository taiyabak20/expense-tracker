const Sequelize = require('sequelize')

const sequelize = require('../utils/db')

const expenses = sequelize.define('expenses', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true 
    },
    amount: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATEONLY, //indicates that it should store only the date without the time.


        defaultValue: Sequelize.NOW, //This sets the default value of createdAt to the current date and time when a record is created. 
    },

    }, 
    {
    timestamps: false, // Disables Sequelize's default createdAt and updatedAt fields
    }

)

module.exports = expenses;