const express = require( 'express' );
const { Int32 } = require('mongodb');
const router = express.Router();
const CouponCodeDiscount = require('../models/coupon');

router.put('/apply_coupon',async(req,res)=>{
    const {
        couponCode,
        phone_number,
        amount,
        mode
    } = req.body;
    
    let coupon =  await CouponCodeDiscount.findOne({code:couponCode}).lean()  
   
    if(coupon){
      if(coupon?.consultation_type?.includes(mode)){
        try{
          const now_date = new Date().toISOString().slice(0,10)
          const last_date = coupon.lastDate.toString().slice(0,10)
          // const created_date = coupon.created.toString().slice(0,10)
          const offer_type = coupon.type;
          const discount = coupon.value;
           
         if(now_date <= last_date ){
          if( coupon.count < coupon.max_count ) {
            if(!(phone_number in coupon.redeem_by)){
            //  await CouponCodeDiscount.findOneAndUpdate({code:couponCode},{redeem_by:{[phone_number]:1}})
             if(offer_type==="amount_off"){
                const finalAmount = (parseInt(amount) - discount);
                res.status(200).json({code: couponCode, type: coupon?.type, redemptions: coupon.redeem_by[phone_number], max_redemptions: coupon.max_redemptions,value:discount,Amount:finalAmount}) 
              }
              else{
                const finalAmount =( parseInt(amount) - (parseInt(amount)*(discount/100)));
                res.status(200).json({code: couponCode, type: coupon?.type, redemptions: coupon.redeem_by[phone_number], max_redemptions: coupon.max_redemptions,value:discount,Amount:finalAmount}) 
              }
            }
            else {
              if(coupon.redeem_by[phone_number] < coupon?.max_redemptions ){
                // coupon.redeem_by[phone_number]+=1
                const count = coupon.redeem_by[phone_number]
                // await CouponCodeDiscount.findOneAndUpdate({code:couponCode},{redeem_by:{[phone_number]:count},type:offer_type,value:discount})
                if(offer_type === "amount_off"){
                  const finalAmount = (parseInt(amount) - discount);
                  res.status(200).json({code: couponCode, type: coupon?.type, redemptions: coupon.redeem_by[phone_number], max_redemptions: coupon.max_redemptions,value:discount,Amount:finalAmount}) 
                }
                else{
                  const finalAmount =( parseInt(amount) - (parseInt(amount)*(discount/100)));
                  res.status(200).json({code: couponCode, type: coupon?.type, redemptions: coupon.redeem_by[phone_number], max_redemptions: coupon.max_redemptions,value:discount,Amount:finalAmount}) 
                }
              }
              else{
                res.status(200).json({msg: `This coupon can be redeemed only ${coupon?.max_redemptions || 1} times.` })  
              }
            }
          }else {
            res.status(200).json({msg: 'This coupon has been redeemed maximum number of times.'})
          }
         }else {
          res.status(200).json({msg: 'This coupon has beeen expired.'})
         }
        }
        catch{
          res.status(500).json({msg: 'An error has been occured.'})
        }
      }else{
        res.status(200).json({msg: `This coupon is not applicable for ${mode || 'this'} mode.`})
      }
    }else {
      res.status(200).json({msg: 'Coupon not found.'})
    }
})

module.exports = router;