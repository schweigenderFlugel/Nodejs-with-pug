const nodemailer = require('nodemailer');
const config = require("../config/config");

const sendMail = async (email, password) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    secure: true,
    port: 587,
    auth: {
      user: config.gmailAddress,
      pass: config.gmailPassword
    }
  });

  let info = await transporter.sendMail({
    from: 'TESTING <sender@gmail.com>',
    to: 'facundoezcastro@gmail.com',
    subject: 'Olvidaste tu contraseña',
    text: 'Hola tarara',
    html: `<p>No me conoces, pero lo harás. Hemos generado una contraseña aleatoria ${password}</p>`
  });

  return "Message sent: %s", info.messageId;
  
}

module.exports = sendMail;