const expenses = require('../models/expenses')
const User = require('../models/signup')
const sequelize = require('sequelize');

exports.showLeaderBoard = async (req, res) =>{
 try{
      User.findAll({
        attributes: ["id" , "name", "totalSum"],
        order: [['totalSum', 'DESC']]
      })
.then(result =>{
  //console.log(result)
  return res.json(result)
})
 }
 catch(err){
  console.log(err)
  res.status(500).json(err)
 }
}