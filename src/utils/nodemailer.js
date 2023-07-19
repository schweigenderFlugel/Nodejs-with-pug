const nodemailer = require('nodemailer');

async function sendMail(email, password) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true,
    port: 465,
    auth: {
      user: 'facundoezcastro@gmail.com',
      pass: 'taratara666'
    }
  });

  let info = await transporter.sendMail({
    from: 'tucorreo@mail.com',
    to: email,
    subject: 'Olvidaste tu contraseña',
    text: 'Hola tarara',
    html: `<p>No me conoces, pero lo harás. Hemos generado una contraseña aleatoria ${password}</p>`
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = sendMail;