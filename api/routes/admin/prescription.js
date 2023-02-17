const express = require('express')
const { connectDb } = require('../../lib/mongodb')

const router = express.Router()

router.get('/prescription', async (req, res) => {
    try{
        const { doctorId, patientPhone } = req.query;
        const client = await connectDb()
        const col = client.db('carenest').collection('prescription')
        const query = {}
        if(doctorId) query['doctorId'] = parseInt(doctorId)
        if(patientPhone) query['patientPhone'] = patientPhone
        const result = await col.find( query ).sort({$natural:-1}).toArray()
        res.status(200).json({msg: 'success', prescriptions: result})
    }catch(e){
        res.status(500).json({msg: 'error', error: e})
    }finally{
        res.end()
    }
})

router.post('/prescription', async (req, res) => {
    try{
        const {doctorId, patientPhone, date, concern,  medicines, note} = req.body;
        if(!doctorId || !patientPhone || !date || !concern || !medicines ){
            res.status(200).json({status: 'error',msg: "Missing required fields"});
        }else{
            const client = await connectDb()
            const col = client.db('carenest').collection('prescription')
            col.insertOne({
                doctorId, patientPhone, date, concern, medicines, note, created: new Date().toISOString()
            })
            res.status(200).json({status: 'success', prescription: {doctorId, patientPhone, date, concern, medicines, note}})
        }
    }catch(e){
        res.status(500).json({status: 'error', error: e})
    }finally{
        res.end()
    }
})

module.exports = router
