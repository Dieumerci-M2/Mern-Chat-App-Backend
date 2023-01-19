import Joi from 'joi'

const validator = ( schema ) => ( playload ) => {
    schema.validate( playload, {abortEarly: false})
}
export const signupValidator = Joi.object().keys( {
    nom: Joi.string().alphanum().min( 3 ).max( 30 ).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min( 4 ).max( 10 ).required(),
} )

export const signinValidator = Joi.object().keys( {
    email: Joi.string().email().required(),
    password: Joi.string().min( 4 ).max( 10 ).required(),
  
} )

export const messageValidator = Joi.object().keys( {
    sender: Joi.string().required(),
    content: Joi.string().min( 2 ).max( 50 ).required(),
    chat: Joi.string().required()
} )