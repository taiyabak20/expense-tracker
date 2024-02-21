const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true
    },
    paymentId: {
        type: String
     
    },
    status: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
