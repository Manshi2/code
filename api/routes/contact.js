const express = require( 'express' );
const {connectDb, addUser, getUser} = require('../lib/mongodb');
const router = express.Router();

router.post('/contact', async(req, res) => {
    try{
        const { username, email, phone, written } = req.body;
        if(!username || !email || !phone || !written){
            res.status(400).json({msg: 'Required fields are missing'})
        }else{
            const client = await connectDb();
            await client.db('carenest').collection('contact').insertOne({
                username, email, phone, written, created: new Date().toISOString()
            })
            res.status(200).json({msg: 'Added to database succcesafully!', data: { username, email, phone, written }})
        }
    }catch (err) {
        console.log(err)
        res.status(500).json({msg: 'Something went wrong, server error.'})
    }finally{
      res.end()   
    }
})
  
router.get('/contact', async(req, res) => {
    try{
        const client = await connectDb();
        const data = await client.db('carenest').collection('contact').find({}).sort({$natural:-1}).toArray();
        res.status(200).json({msg: 'Data fetched successfully', data})
    }catch(err){
        console.log(err)
        res.status(500).json({msg: 'Something went wrong, server error.'})
    }finally{
      res.end()   
    }
})

module.exports = router;