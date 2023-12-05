const joi = require('joi')

const schemaCadastroCliente = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'É necessário inserir o nome para cadastro.',
        'string.empty': 'É necessário inserir o nome para cadastro.'
    }),
    email: joi.string().required().email().messages({
        'any.required': 'É necessário inserir o email para cadastro.',
        'string.empty': 'É necessário inserir o email para cadastro.',
        'string.email': 'É necessário inserir um email válido para cadastro.'
    }),
    cpf: joi.string().required().messages({
        'any.required': 'É necessário inserir o cpf para cadastro.',
        'string.empty': 'É necessário inserir o cpf para cadastro.'
    }),
    cep: joi.string(),
    rua: joi.string(),
    numero: joi.number(),
    bairro: joi.string(),
    cidade: joi.string(),
    estado: joi.string()
})

module.exports = schemaCadastroCliente