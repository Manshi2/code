const express = require( 'express' );
const nodemailer = require('nodemailer');


const router = express.Router();
router.post('/email_contactus', async(req, res) => {
  try{
    const { name, email, phone, written } = req.body;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'Connect@carenest.in',
      pass: 'eokhzmenosbnxdtl'
    },
    tls: {
      rejectUnauthorized: false
    }
  });

 
  await transporter.sendMail({
      from: "Connect@carenest.in ",
      to: "manshi.eveit@gmail.com, Connect@carenest.in",
      subject: `Contact form submission from ${name}`,
      html: ` <p>You have a contact form submission</p>
              <p><strong> Name: </strong> ${name}</p>
              <p><strong>Email: </strong> ${email}</p>
              <p><strong>Phone No: </strong> ${phone}</p>
            
              <p><strong>Message: </strong> ${written}</p>
            `
  })
  return res.status(200).json({ error: "" });
}catch(err){
  console.log(err)
  res.status(500).json({msg: 'Failed to process request, server error.'})
}
});

module.exports = router;