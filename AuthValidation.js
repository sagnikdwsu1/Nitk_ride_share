
const Joi = require('joi');

// const signupValidation = (req, res, next) => {
//     const schema = Joi.object({
//         name: Joi.string().min(3).max(100).required(),
//         email: Joi.string().email().required(),
//         password: Joi.string().min(4).max(100).required()
//     });
//     const { error } = schema.validate(req.body);
//     if (error) {
//         return res.status(400)
//             .json({ message: "Bad request", error })
//     }
//     next();
// }




const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required(),
        gender: Joi.string().valid("Male", "Female", "Other").required(),
        phone: Joi.string().pattern(/^\d{10}$/).required(),
        comments: Joi.string().max(500).optional() // Optional field
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ 
            message: "Bad request", 
            error: error.details.map(err => err.message) // More readable error messages
        });
    }
    next();
};

const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400)
            .json({ message: "Bad request", error })
    }
    next();
}
module.exports = {
    signupValidation,
    loginValidation
}
