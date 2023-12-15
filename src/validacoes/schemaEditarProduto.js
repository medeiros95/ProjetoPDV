const joi = require('joi')

const schemaEditarProduto = joi.object({
    descricao: joi.string().required().messages({
        'any.required': 'É necessário inserir a descricao.',
        'string.empty': 'É necessário inserir a descricao.'
    }),
    quantidade_estoque: joi.number().integer().min(0).required().messages({
        'number.base': 'É necessário inserir a quantidade em estoque do produto.',
        'number.integer': 'É necessário inserir um número inteiro no campo quantidade em estoque.',
        'number.min': 'A quantidade em estoque não pode ser um número negativo.',
        'any.required': 'É necessário inserir a quantidade em estoque do produto para cadastro.'
    }),
    valor: joi.number().integer().min(1).required().messages({
        'number.base': 'É necessário inserir o valor do produto em centavos para cadastro.',
        'number.integer': 'É necessário inserir o valor em centavos como um número inteiro para cadastro.',
        'number.min': 'O valor do produto não pode ser zero ou negativo.',
        'any.required': 'É necessário inserir o valor do produto em centavos para cadastro.'
    }),
    categoria_id: joi.number().required().messages({
        'any.required': 'É necessário inserir a categoria do produto.',
        'string.empty': 'É necessário inserir a categoria do produto.'
    }),
    produto_imagem: joi.string().allow('', null).uri().messages({
        'string.uri': 'O campo produto_imagem deve ser uma URL válida.',
    })
})

module.exports = schemaEditarProduto