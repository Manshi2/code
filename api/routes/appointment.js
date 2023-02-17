const express = require( 'express' );
const {connectDb, addUser} = require('../lib/mongodb');
const router = express.Router();

router.post('/appointment', async(req, res) => {
    try{
        const { name, dob, guardian, gender, email, phone, concern, friendName, friendEmail, event, video, order } = req.body;
        if(!name || !dob || !gender || !phone || !concern || !event){
            res.status(400).json({msg: 'Required fields are missing'})
        }else{
            const client = await connectDb();
            await addUser({phone, name, dob, guardian, gender, email })
            if(order?.coupon && order?.coupon != '') {
                let coupon = await client.db('carenest').collection('coupons').findOne({code: order?.coupon})
                try{
                    coupon.count += 1;
                    coupon.redeem_by[phone] = coupon.redeem_by[phone] ? coupon.redeem_by[phone] + 1 : 1 
                    await client.db('carenest').collection('coupons').updateOne({code: order.coupon}, {$set: {count: coupon.count, redeem_by: coupon.redeem_by}})
                }catch (err) {
                    console.log(err)
                }
            }
            await client.db('carenest').collection('appointment').insertOne({
                name, dob, guardian, gender, email, phone, concern, friendName, friendEmail, event, mode: (video ? 'Video' : 'Call'), order
            })
            res.status(200).json({msg: 'Added to database succcesafully!', data: { name, dob, guardian, gender, email, phone, concern, friendName, friendEmail, event  }})
        }
    }catch (err) {
        console.log(err)
        res.status(500).json({msg: 'Something went wrong, server error.'})
    }finally{
      res.end()   
    }
})
  
router.get('/appointment', async(req, res) => {
    try{
        const client = await connectDb();
        const data = await client.db('carenest').collection('appointment').find({}).toArray();
        res.status(200).json({msg: 'Data fetched successfully', data})
    }catch(err){
        console.log(err)
        res.status(500).json({msg: 'Something went wrong, server error.'})
    }finally{
      res.end()   
    }
})

module.exports = router;