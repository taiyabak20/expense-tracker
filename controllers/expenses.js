const expenses = require('../models/expenses')

exports.getAll = (req, res)=>{
    expenses.findAll({raw: true,
    attributes: ["id", "amount", "description", "category"]})
    .then(data=>{
        return res.json({data})
    })
    .catch(err=> console.log(err))
}

exports.postExpense = (req, res)=>{
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;

    expenses.create({
        amount: amount,
        description: description,
        category: category
    })
    .then(data =>{
        return res.json({data});
        console.log(data)
    })
    .catch(err => console.log(err))
}

exports.deleteExpense = (req, res)=>{
    const id = req.params.id
    expenses.findByPk(id)
    .then(expense => {
        return expense.destroy()
    } )
    .then(()=>{
        console.log('expense deleted')
    })
    .catch(err => console.log(err))
}

exports.editExpense = (req, res)=>{
    const id = req.params.id;
    expenses.findByPk(id)
    .then(expense =>{
        expense.amount = req.body.amount,
        expense.description = req.body.description,
        expense.category = req.body.category
        return expense.save()
    })
    .then(()=> console.log('update successful'))
    .catch(err => console.log(err))
}