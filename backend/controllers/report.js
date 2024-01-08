const expenses = require('../models/expenses')
const { Op ,literal} = require('sequelize')


exports.dataByDate = async (req, res)=>{

    const date = req.body.date;
    const expense = await req.user.getExpenses({where : {createdAt: date}});
    return res.json(expense)
}

exports.dataByMonth = async (req, res) =>{
    try{
        const month = req.body.month;
        const startDate = new Date(month);
            const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1);
            console.log(startDate , endDate)
        const result = await req.user.getExpenses({where : {
            createdAt : {
                [Op.gte]: startDate,
                [Op.lt] : endDate                       
            }
        }})
        return res.json(result)
            }catch(e){
                console.log(e)
                return res.status(500).json({ success: false, msg: "Internal server error" })
            }
}


exports.dataByYear = async(req, res)=>{
    try{
        const year = req.body.year;
        const startYear = new Date(year)
        const endYear = new Date(startYear.getFullYear()+1 , 0 , 1)
        console.log(startYear, endYear)
        const result = await req.user.getExpenses({
            where: {
              createdAt: {
                [Op.gte]: startYear,
                [Op.lt]: endYear,
              },
            },
           
            raw: true, 
          });
        //console.log(result)
        return res.json(result)
            }catch(e){
                console.log(e)
                return res.status(500).json({ success: false, msg: "Internal server error" })
            }
}

