const nodemailer = require('nodemailer');
const config = require("../config/config");

const sendMail = async (email) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    secure: true,
    port: 587,
    auth: {
      user: config.gmailAddress,
      pass: config.gmailPassword
    },
    tls: {
      rejectUnauthorized: false
  }
  });

  let info = await transporter.sendMail(email)

  return `Message sent: %s", ${info.messageId}`;
  
}

module.exports = sendMail;