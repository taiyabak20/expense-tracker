const expenses = require('../models/expenses')
const User = require('../models/signup')
const sequelize = require('sequelize');

exports.showLeaderBoard = async (req, res) =>{
    const result = await expenses.findAll({
        attributes: [
        [sequelize.fn('SUM', sequelize.col('amount')), 'totalAmount'], ['userId', 'userId']],
    group: ['userId'],
    order: [[sequelize.literal('totalAmount'), 'DESC']],
    limit: 10
})
//console.log(result)
const userIds = result.map(entry => entry.userId)
// console.log(userIds)
const users = await User.findAll({
    attributes: ['id', 'name'],
})
 //console.log(users)

 const leaderBoardData = [];

 users.forEach(user => {
   const entry = result.find(entry => entry.userId === user.id);
 
   const data = {
     totalAmount: entry ? entry.dataValues.totalAmount : 0,
     username: user.name
   };
 
   leaderBoardData.push(data);
 });
 
 console.log(leaderBoardData);
 return res.json(leaderBoardData)
}