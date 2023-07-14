const boom = require('@hapi/boom'); 

function validatorHandler(schema, property) {
    return (req, res, next) => {
        const data = req[property];
        // schema.validate es simplemente Joi. Sólo necesitamos el mensaje de error
        const { error } = schema.validate(data, { abortEarly: false });
        if (error) {
            next(boom.badRequest(error));
        }
        next();
    }
}

module.exports = validatorHandler;