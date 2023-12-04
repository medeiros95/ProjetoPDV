const joi = require('joi')

const schemaEditarProduto = joi.object({
    descricao: joi.string().required().messages({
        'any.required': 'É necessário inserir a descricao.',
        'string.empty': 'É necessário inserir a descricao.'
    }),
    quantidade_estoque: joi.number().required().messages({
        'any.required': 'É necessário inserir a quantidade do estoque.',
        'string.empty': 'É necessário inserir a quantidade do estoque.'
    }),
    valor: joi.number().required().messages({
        'any.required': 'É necessário inserir o valor do produto.',
        'string.empty': 'É necessário inserir o valor do produto.'
    }),
    categoria_id: joi.number().required().messages({
        'any.required': 'É necessário inserir a categoria do produto.',
        'string.empty': 'É necessário inserir a categoria do produto.'
    })
})

module.exports = schemaEditarProduto