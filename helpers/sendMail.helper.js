var nodemailer = require('nodemailer');

module.exports = (email, subject, html)=>{
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PW
    }
  })
  
  var mailOptions = {
    from: process.env.USER_EMAIL,
    to: email,
    subject: subject,
    html: html
  }
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log("send email successfully");
    }
  });
}