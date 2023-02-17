const router = require("express").Router()
const jwt = require("jsonwebtoken")
const { connectDb } = require('../../lib/mongodb')

router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body

        if(!email || !password) {
            res.status(401).json({msg: 'Missing required information!'})
        }else{
            const client = await connectDb();
            const user = await client.db('carenest').collection('doctors').findOne({email: email})

            if(user) {
                if(user.password == password){
                    const token = jwt.sign({ id: user.id, email, name: user.name, specialization: user.specialization, signature: user.signature, phone: user.phone}, 'carenest-secured', { expiresIn: '30d' })
                    res.status(200).json({status: 'success', token})
                }else{
                    res.status(401).json({status: 'failed', msg: 'Invalid password!'})
                }
            }else{
                res.status(401).json({msg: 'User not found!'})
            }
        }
    } catch (err) {
        res.status(500).json(err)
    }finally {
        res.end()
    }
});

module.exports = router;