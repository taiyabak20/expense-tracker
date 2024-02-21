const Razorpay = require('razorpay');
const Order = require('../models/orders')
require('dotenv').config();

var rzp = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})

exports.purchasePremium = async (req, res) => {
  try {
    const options = {
      amount: 25000,
      currency: 'INR',
      receipt: 'order_rcptid_11'
    };

    const order = await rzp.orders.create(options);

    await Order.create({
      orderId: order.id,
      status: 'Pending',
      userId: req.user._id
    });

    console.log(order);
    return res.status(201).json({ order: order, key_id: rzp.key_id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

exports.successfulTransaction = async (req, res) => {
  try {
    const { paymentId, orderId } = req.body;
    console.log(paymentId, orderId)
    const order = await Order.findOne({ orderId: orderId });

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    await order.updateOne({ $set: { paymentId: paymentId, status: "Successful" } });
    await req.user.updateOne({ $set: { isPremiumUser: true } });

    console.log("Transaction successful");
    return res.status(202).json({ success: true, message: "Transaction Successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}


exports.failedTransaction = async (req, res) => {
  try {
    const paymentId = req.body.paymentId;
    const orderId = req.body.orderId

    console.log(paymentId, orderId)
    await Order.findOneAndUpdate(
      { _id: orderId },
      { $set: { paymentId: paymentId, status: "Failed" } }
    );

    await req.user.updateOne({ $set: { isPremiumUser: false } });

    console.log("payment failed")
    return res.status(202).json({ success: true, message: "Transaction Failed" })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ msg: "Internal server error" })
  }
}