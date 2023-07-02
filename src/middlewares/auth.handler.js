const boom = require('@hapi/boom');

function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.unauthorized('No access to the articles'));
    }
  }
}

module.exports = { checkRoles }
