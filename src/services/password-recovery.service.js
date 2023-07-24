const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UsersService = require('./users.service');
const sendMail = require('../utils/nodemailer');
const config = require('../config/config')

const service = new UsersService();

class PasswordRecoveryService {
    async sendRecovery(email) {
    const user = await service.getUserByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const payload = { sub: user.email };
    const token = jwt.sign(payload, config.jwtAccessSecret, {expiresIn: '15min'});
    const link = `http://myfrontend.com/recovery?token=${token}`;
    await service.saveRecoveryToken(user.id, token);
    let mail = {
      from: 'TESTING <sender@gmail.com>',
      to: config.gmailAddress,
      subject: 'Olvidaste tu contraseña',
      text: 'Hola tarara',
      html: `<p>No me conoces, pero lo harás. Hemos generado un link para recuperar la contraseña ${link}</p>`
    };
    const recoveryEmail = await sendMail(mail);
    return recoveryEmail;
  }

  async changePassword(recoveryToken, password) {
    const token = jwt.verify(recoveryToken, config.jwtAccessSecret);
    const user = await service.getUserByEmail(token.sub);
    const tokenNull = null;
    if (user.recoveryToken !== recoveryToken) {
      throw boom.unauthorized();
    }
    const modifiedPassword = await service.updatePassword(user.id, password);
    await service.saveRecoveryToken(user.id, tokenNull);
    return modifiedPassword;
  }
}

module.exports = PasswordRecoveryService;