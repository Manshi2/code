const { connectDb } = require('./lib/mongodb');
const fs = require('fs');

const addCoupons = async () => {
    let codes = JSON.parse(fs.readFileSync('./codes.json').toString())
    // console.log(coupons.length)
    const client = await connectDb();
    const col = client.db('carenest').collection('coupons')
    const currDate = new Date().toISOString()
    let coupons = codes.map(code => ({
        created: currDate,
        currency: 'inr',
        max_redemptions: 1,
        redeem_by: {},
        valid: true,
        code: code,
        value: 199,
        type: 'amount_off',
        lastDate: new Date('01-01-2035').toISOString(),
        updatedAt: new Date().toISOString(),
        count: 0,
        max_count: 1,
    }))
    await col.insertMany(coupons)
    console.log("Done Added!")

    await client.close()
    return 
}

addCoupons()