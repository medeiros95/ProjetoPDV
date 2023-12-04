const joi = require('joi')

const schemaLogin = joi.object({
    email: joi.string().required().email().messages({
        'any.required': 'Credenciais inválidas. Verifique o usuário ou senha e tente novamente.',
        'string.empty': 'Credenciais inválidas. Verifique o usuário ou senha e tente novamente.',
        'string.email': 'Credenciais inválidas. Verifique o usuário ou senha e tente novamente.'
    }),
    senha: joi.string().required().messages({
        'any.required': 'Credenciais inválidas. Verifique o usuário ou senha e tente novamente.',
        'string.empty': 'Credenciais inválidas. Verifique o usuário ou senha e tente novamente.',
    })
})

module.exports = schemaLogin
