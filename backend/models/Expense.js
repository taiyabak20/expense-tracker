const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    amount: {
        type: Number,
    },
    quantity: {
        type: Number,
        
    },
    category: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
