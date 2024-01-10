const sequelize = require('../not used/db')
const s3service = require('../services/s3services')
exports.getAll = (req, res)=>{
    
    const isPremium = req.user.isPremiumUser
    req.user.getExpenses({raw: true,
    attributes: ["id", "amount", "description", "category"]})
    .then(data=>{
        return res.json({data, isPremium})
    })
    .catch(err=> console.log(err))
}

exports.postExpense =async (req, res)=>{
    const t = await sequelize.transaction();
    try
   { const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;

   const data =  await req.user.createExpense({
        amount: amount,
        description: description,
        category: category
    },
    { transaction: t })
    await t.commit();
    req.user.totalSum += Number(amount);
    await req.user.save()
    return res.json({data});   
}
    catch(err) {
        await t.rollback();
         console.log(err)
         return res.status(500).json({ error: 'Internal server error' });
        }
}

exports.deleteExpense = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const id = req.params.id;
        const expense = await req.user.getExpenses({ where: { id: id }, transaction: t });
        if (expense && expense.length > 0) {
            const expenseAmount = Number(expense[0].amount);
            req.user.totalSum -= expenseAmount;
            //console.log(expenseAmount , req.user.totalSum)
            await req.user.save();
            await expense[0].destroy({ transaction: t });
            await t.commit();
            console.log('Expense deleted');
            return res.status(200).json({ success: true, message: 'Expense deleted successfully' });
        } else {
            await t.rollback();
            return res.status(404).json({ success: false, message: 'Expense not found' });
        }
    } catch (err) {
        await t.rollback();
        console.error(err);
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }
};


exports.editExpense = (req, res)=>{
    const id = req.params.id;
    req.user.getExpenses({where: {id : id}})
    .then(expense =>{
        expense[0].amount = req.body.amount,
        expense[0].description = req.body.description,
        expense[0].category = req.body.category
        return expense[0].save()
    })
    .then(()=> console.log('update successful'))
    .catch(err => console.log(err))
}

exports.downloadExpense =async (req, res) =>{

    try{
        const expense = await req.user.getExpenses();
        const stringified = JSON.stringify(expense)
        const userId = req.user.id;
        //console.log(userId)
        const filename = `Expense ${userId}/ ${new Date}.txt`;
        const fileUrl =await s3service.uploadToS3(stringified, filename);
        //console.log(fileUrl)
        res.json({fileUrl, success: true})
    }
    catch(err){
        res.status(500).json({fileUrl: '', success: false, err: err})
    }
}

exports.getExpenses = async (req, res) => {
    try{
        const page = req.query.page || 1;
        const exp = req.user.getExpenses({
            offset : (page - 1)*5,
            limit: 5
        })
        const totalExp = req.user.countExpenses();
        const [expenses, totalExpenses] = await Promise.all([exp, totalExp])

        return res.json({expenses, totalExpenses})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({success : false, msg: "Internal server error"})
    }
}