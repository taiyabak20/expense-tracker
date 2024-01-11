const Razorpay = require('razorpay');
const Order = require('../models/orders')
const User = require('../models/signup')
require('dotenv').config();

var rzp = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

exports.purchasePremium = async (req, res) =>{
    try {   
         
    const options = {amount: 25000, currency: "INR", receipt: "order_rcptid_11"};
{
    const order = await rzp.orders.create(options)
     await req.user.createOrder({orderId: order.id, status: 'Pending'})
    console.log(order)
    return res.status(201).json({order: order, key_id: rzp.key_id})
  }
    //     .catch(err =>{
    //         throw new Error(err)
    //     })
    // })
    
  }
    catch(err){
        console.log(err)
    }

   
}

exports.successfullTransaction = async(req,res)=>{
    try{
      const { paymentId, orderId} = req.body;
      Order.findOne({where: {orderId : orderId}})
      .then(order =>{
        order.update({paymentId: paymentId, status: "Successful"})
        .then(()=>{
          req.user.update({isPremiumUser : true})
          .then(()=> {
            return res.status(202).json({success: true, message: "Transaction Successful"})
          })
          .catch(err => {throw new Error(err)})

        })
      })
      .catch(err => {throw new Error(err)})

    }catch(e){
      console.log(e)
    return res.status(500).json({msg : "Internal server error"})
    }
  }


exports.failedTransaction =  async(req,res)=>{
    try{
      const paymentId = req.body.paymentId;
      const orderId = req.body.orderId

      console.log(paymentId, orderId)
      Order.findOne({where : { orderId: orderId}})
      .then((order)=>{
          order.update({paymentId: paymentId, status: "Failed"})
      })
      .then(()=>{
        req.user.update({isPremiumUser : false})
        .then(()=> {
          return res.status(202).json({success: true, message: "Transaction Failed"})
        })
        .catch(err => {throw new Error(err)})

      })
   
      console.log("payment failed")
    }catch(e){
      console.log(e)``
      return res.status(500).json({msg : "Internal server error"})
    }
  }