const expenses = require('../models/expenses')
const User = require('../models/signup')
const sequelize = require('sequelize');

exports.showLeaderBoard = async (req, res) =>{
 try{
  const leaderBoardData = await User.findAll({
    attributes: ['id', 'name',  [sequelize.fn('SUM', sequelize.col('expenses.amount')), 'totalAmount']],
    include : [{
      model: expenses, 
      attributes: []
    }],
    group: ['id'],
    order: [['totalAmount', 'DESC']]
    
  })

console.log('leaderBoardData')
  return res.json(leaderBoardData)
 }

 catch(err){
  console.log(err)
  res.status(500).json(err)
 }
}