const Sequelize = require('sequelize')
const sequelize = require('../utils/db')

const downloadedfiles = sequelize.define('downloadedfiles' , {
    id: {
        type : Sequelize.INTEGER,
        primaryKey : true,
        allowNull : false,
        autoIncrement : true
    },
    url:{
        type : Sequelize.STRING,
        allowNull: false
    }
})

module.exports = downloadedfiles;