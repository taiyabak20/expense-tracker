const s3service = require('../services/s3services')
const Expense = require('../models/Expense');
const User = require('../models/User');
const DownloadedFile = require('../models/filesDownloaded')
const mongoose = require('mongoose')
exports.getAll = async (req, res) => {
    try {
        const isPremium = req.user.isPremiumUser
        const page = req.query.page || 1;
        const userId = req.user._id;
        const numOfExpenses = Number(req.body.numOfExpenses)

        const expenses = await Expense.find({ userId })
            .skip((page - 1) * numOfExpenses)
            .limit(numOfExpenses);

        const totalExpenses = await Expense.countDocuments({ userId });
        const totalPages = Math.ceil(totalExpenses / numOfExpenses);
        //console.log(req.user)
        //console.log(totalExpenses, totalPages)
        return res.json({ expenses, totalExpenses, totalPages, isPremium })
    }

    catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, msg: "Internal server error" })
    }
}

exports.postExpense = async (req, res) => {

    try {
        const amount = req.body.amount;
        const quantity = req.body.quantity;
        const category = req.body.category;

        const newExpense = await Expense.create({
            amount,
            quantity,
            category,
            userId: req.user._id
        });
        console.log(newExpense)
        req.user.totalSum += Number(amount);
        await req.user.save()
        return res.json({ data: newExpense });
    }
    catch (err) {

        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

exports.deleteExpense = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        const expense = await Expense.findByIdAndDelete({ _id: id, userId: req.user._id });
        console.log(expense)
        if (expense) {
            const expenseAmount = Number(expense.amount);
            req.user.totalSum -= expenseAmount;
            //console.log(expenseAmount , req.user.totalSum)
            await req.user.save();
            
            console.log('Expense deleted');
            return res.status(200).json({ success: true, message: 'Expense deleted successfully' });
        } else {

            return res.status(404).json({ success: false, message: 'Expense not found' });
        }
    } catch (err) {

        console.error(err);
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }
};


exports.editExpense = (req, res) => {
    const id = req.params.id;
console.log(id)
    Expense.findById(id)
        .then(expense => {
            expense.amount = req.body.amount,
                expense.description = req.body.description,
                expense.category = req.body.category
            return expense.save()
        })
        .then(() => console.log('update successful'))
        .catch(err => console.log(err))
}

exports.downloadExpense = async (req, res) => {

    try {
        const expenses = await Expense.find({ userId: req.user._id });

        const stringified = JSON.stringify(expenses)
        const userId = req.user._id;
        console.log(userId)
        const filename = `Expense ${userId}/ ${new Date}.txt`;
        const fileUrl = await s3service.uploadToS3(stringified, filename);
        await DownloadedFile.create({ url: fileUrl , userId: req.user._id});
        res.json({ fileUrl, success: true })

    }
    catch (err) {
        res.status(500).json({ fileUrl: '', success: false, err: err })
    }
}

exports.downloadedFiles = async (req, res) => {
    const urls = await DownloadedFile.find({ userId: req.user._id });
    return res.json({ url: urls })
}