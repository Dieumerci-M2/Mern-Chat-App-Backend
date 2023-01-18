import Joi from 'joi'

const validator = ( schema ) => ( playload ) => {
    schema.validate( playload, {abortEarly: false})
}
const signupValidator = Joi.object().keys( {
    nom: Joi.string().alphanum().min( 3 ).max( 30 ).required(),
    email: Joi.email().required(),
    password: Joi.string().min( 4 ).max( 10 ).required(),
    picture: Joi.string().optional,
} )

const signinValidator = Joi.object().keys( {
    email: Joi.email().required(),
    password: Joi.string().min( 4 ).max( 10 ).required(),
  
} )

const messageValidator = Joi.object().keys( {
    sender: Joi.string().required(),
    content: Joi.string().min( 2 ).max( 50 ).required(),
    chat: Joi.string().required()
} )

exports.validateSignup = validator( signupValidator )
exports.validateSigning = validator( signinValidator )
exports.validateMessage = validator(messageValidator)