const expenses = require('../models/expenses')

exports.getAll = (req, res)=>{

    const isPremium = req.user.isPremiumUser
    req.user.getExpenses({raw: true,
    attributes: ["id", "amount", "description", "category"]})
    .then(data=>{
        return res.json({data, isPremium})
    })
    .catch(err=> console.log(err))
}

exports.postExpense = (req, res)=>{

    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;

req.user.createExpense({
        amount: amount,
        description: description,
        category: category,
       
    })
    .then( async(data)=>{
    req.user.totalSum = Number(req.user.totalSum) + Number(amount);
    await req.user.save()
        return res.json({data});
        //console.log(data)
    })
    .catch(err => console.log(err))
}

exports.deleteExpense =  (req, res)=>{
    const id = req.params.id
    req.user.getExpenses({where: {id : id}})
    .then(async expense => {
        req.user.totalAmount = Number(req.user.totalSum) - Number(expense[0].expense)
        console.log(expense)
        await req.user.save()
        return expense[0].destroy()
    } )
    .then(()=>{
        console.log('expense deleted')
    })
    .catch(err => console.log(err))
}

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