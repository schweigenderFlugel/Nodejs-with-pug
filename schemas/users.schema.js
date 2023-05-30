const Joi = require('joi'); 

class UserSchemaValidation {
    name = Joi.required();
}