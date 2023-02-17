const express = require( 'express' );
const { connectDb } = require('../../lib/mongodb')
const cookieParser = require('cookie-parser')

const router = express.Router();
router.use(cookieParser());

const createQuery = (q, field = 'created') => {
    try{
        const search = q?.search ? new RegExp(q?.search, 'i') : ''
        const query = {}
        if(search) query.$or = [
            { name: search },
            { phone: search },
            { email: search }
        ]

        if((q.startDate || q.endDate) && q.all != 'true') {
            query[field] = {}
            if(q.startDate) query [field] ['$gte'] = q.startDate  
            if(q.endDate) query [field] ['$lte'] = q.endDate
        }

        return query
    }catch(err) {
        console.log(`🚀 ~ file: admin.js:23 ~ createQuery ~ err`, err)
        
        return ({})
    }
}

router.get('/stats', (async (req, res) => {
    try{
        const client = await connectDb();
        const appointments = await client.db('carenest').collection('appointment').count();
        const contacts = await client.db('carenest').collection('contact').count();
        const users = await client.db('carenest').collection('users').count();
        res.status(200).json({appointments, contacts, users});
    }catch(e){
        console.log(`🚀 ~ file: stats.js:16 ~ router.get ~ e`, e)
        res.status(500).json({msg: 'falied', err: e})
    }finally{
        res.end()
    }
}))

router.get('/contact', async(req, res) => {
    try {
        const page = req.query?.page || 0;
        const query = createQuery(req.query)
        const client = await connectDb();
        const contacts = await client.db('carenest').collection('contact').find(query).skip(page * 10).sort({$natural:-1}).limit(50).toArray()
        res.status(200).json({status: 'success', contacts})
    }catch(e){
        console.log(`🚀 ~ file: stats.js:14 ~ router.post ~ e`, e)
        res.status(500).json({msg: 'falied', err: e})
    }finally{
        res.end()
    }
})

router.get('/appointment', async(req, res) => {
    try {
        const page = req.query?.page || 0;
        const query = createQuery(req.query, 'event.created')
        if(req?.query?.concern) query.concern = new RegExp(req?.query?.concern, 'i')
        const client = await connectDb();
        const appointments = await client.db('carenest').collection('appointment').find(query).skip(page * 10).sort({$natural:-1}).limit(50).toArray()
        res.status(200).json({status: 'success', appointments})
    }catch(e){
        console.log(`🚀 ~ file: stats.js:14 ~ router.post ~ e`, e)
        res.status(500).json({msg: 'falied', err: e})
    }finally{
        res.end()
    }
})

router.get('/users', async(req, res) => {
    try {
        const page = req.query?.page || 0;
        const query = createQuery(req.query)
        const client = await connectDb();
        const users = await client.db('carenest').collection('users').find(query).skip(page * 10).sort({$natural:-1}).limit(50).toArray()
        res.status(200).json({status: 'success', users})
    }catch(e){
        console.log(`🚀 ~ file: stats.js:14 ~ router.post ~ e`, e)
        res.status(500).json({msg: 'falied', err: e})
    }finally{
        res.end()
    }
})

router.get('/doctors', async(req, res) => {
    try {
        const page = req.query?.page || 0;
        const query = createQuery(req.query);
        if(req?.query?.id) query.id = parseInt(req.query?.id)
        const client = await connectDb();
        const doctors = await client.db('carenest').collection('doctors').find(query).skip(page * 10).sort({$natural:-1}).limit(50).toArray()
        res.status(200).json({status: 'success', doctors})
    }catch(e){
        console.log(`🚀 ~ file: index.js:100 ~ router.get ~ e`, e)
        res.status(500).json({msg: 'falied', err: e})
    }finally{
        res.end()
    }
})

// axios(`http://localhost:8080/api/admin/appointment?search=&startDate=2022-10-31T09:34:26.000Z&endDate=2022-12-13T06:28:30.208Z`)

module.exports = router