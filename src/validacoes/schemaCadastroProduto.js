const joi = require('joi')

const schemaCadastroProduto = joi.object({
    descricao: joi.string().required().messages({
        'any.required': 'É necessário inserir a descrição do produto para cadastro.',
        'string.empty': 'É necessário inserir a descrição do produto para cadastro.'
    }),
    quantidade_estoque: joi.number().integer().required().messages({
        'number.base': 'É necessário inserir a quantidade em estoque do produto para cadastro.',
        'number.integer': 'É necessário inserir um número inteiro no campo quantidade em estoque para cadastro.',
        'any.required': 'É necessário inserir a quantidade em estoque do produto para cadastro.'
    }),
    valor: joi.number().integer().required().messages({
        'number.base': 'É necessário inserir o valor do produto em centavos para cadastro.',
        'number.integer': 'É necessário inserir o valor em centavos como um número inteiro para cadastro.',
        'any.required': 'É necessário inserir o valor do produto em centavos para cadastro.'
    }),
    categoria_id: joi.number().integer().required().messages({
        'number.base': 'É necessário inserir o ID da categoria do produto para cadastro.',
        'number.integer': 'É necessário inserir o ID da categoria do produto para cadastro.',
        'any.required': 'É necessário inserir o ID da categoria do produto para cadastro.'
    })

})

module.exports = schemaCadastroProduto