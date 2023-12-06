const joi = require('joi')

const schemaEditarUsuario = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'É necessário inserir o nome.',
        'string.empty': 'É necessário inserir o nome.'
    }),
    email: joi.string().required().email().messages({
        'any.required': 'É necessário inserir o email.',
        'string.empty': 'É necessário inserir o email.',
        'string.email': 'É necessário inserir um email válido.'
    }),
    senha: joi.string().required().messages({
        'string.empty': 'É necessário inserir a senha.',
        'any.required': 'É necessário inserir a senha.'
    })
})

module.exports = schemaEditarUsuario