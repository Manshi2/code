const express = require( 'express' );
const {connectDb, addUser, getUser} = require('../lib/mongodb');
const Razorpay = require("razorpay");
const shortid = require("shortid");

const router = express.Router();
console.log(process.env.NODE_ENV)
const generateRecieptId = ( type="", phone = "") => `${type ? `${type}-` : ''}${phone ? `${phone}-` : ''}${shortid.generate()}`

router.post('/payment', async (req, res) => {
    // Initialize razorpay object
    const razorpay = new Razorpay({
        key_id: process.env[process.env.NODE_ENV === 'development' ? 'RAZORPAY_KEY_TEST' : 'RAZORPAY_KEY_LIVE'],
        key_secret: process.env[process.env.NODE_ENV === 'development' ? 'RAZORPAY_SECRET_TEST' : 'RAZORPAY_SECRET_LIVE'],
      });
      
      const {amount, phone, type} = req.body

      // Create an order -> generate the OrderID -> Send it to the Front-end
      const payment_capture = 1;
      const currency = "INR";
      const options = {
        amount,
        currency,
        receipt: generateRecieptId(type, phone),
        payment_capture,
      };

      try {
        const response = await razorpay.orders.create(options);
        res.status(200).json({
          id: response.id,
          currency: response.currency,
          amount: response.amount,
          receipt: response.receipt
        });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
})

module.exports = router