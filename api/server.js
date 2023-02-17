const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const {getUser} = require('./lib/mongodb')
var cors = require('cors');
const mongoose = require('mongoose')
const upload = require('./routes/upload')
const contact = require('./routes/contact')
const appointment = require('./routes/appointment')
const events = require('./routes/events')
const comments = require('./routes/comments')
const email_notify  = require('./routes/email_notify')
const update_sitemap  = require('./routes/update_sitemap')
const email_contactus  = require('./routes/email_contactus')
const contact_form  = require('./routes/contact_form')
const payment = require('./routes/payment')
const dashboard = require('./routes/admin')
const prescription = require('./routes/admin/prescription')
const adminAuth = require('./routes/admin/auth')
const apply_coupon = require('./routes/apply_coupon')

const uri = process.env['MONGODB_URI']

require('dotenv').config();

const rootRouter = express.Router();
const app = express(),
  port = 8080;
const buildPath = path.normalize(path.join(__dirname, '../frontend/build'));

mongoose.connect(
  uri,
  {useNewUrlParser: true, useUnifiedTopology: true},
  () => {
    console.log('Connected to mongodb via mongoose!')
  }
)

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(buildPath));

app.use( '/api', upload );
app.use( '/api', contact );
app.use( '/api', appointment );
app.use( '/api', events );
app.use( '/api', comments );
app.use( '/api', email_notify );
app.use( '/api', update_sitemap );
app.use( '/api', email_contactus );
app.use( '/api', contact_form );
app.use( '/api', payment );
app.use( '/api', apply_coupon );
app.use( '/api/admin', dashboard );
app.use( '/api/admin', prescription );
app.use( '/api/admin', adminAuth );

app.get('/api/users', async(req, res) => {
  try{
    const data = await getUser(req.query)
    res.status(200).json({msg: 'Data fetched successfully', users: data.users || []})
  }catch(err){
      console.log(err)
      res.status(500).json({msg: 'Something went wrong, server error.'})
  }finally{
    res.end()   
  }
})

// Render all routes from frontend
rootRouter.get('(/*)?', async (req, res, next) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});
app.use(rootRouter);


app.listen(port, (err) => console.log(err || `Server listening on the port::${port}`));