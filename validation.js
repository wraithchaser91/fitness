const Joi = require("@hapi/joi");

validate = data =>{
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        username: Joi.string().min(6).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        permissions: Joi.number().required()
    });

    return schema.validate(data);
}

module.validate = validate;