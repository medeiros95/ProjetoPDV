const joi = require('joi')

const schemaCadastroProduto = joi.object({
    descricao: joi.string().required().messages({
        'any.required': 'É necessário inserir a descrição do produto para cadastro.',
        'string.empty': 'É necessário inserir a descrição do produto para cadastro.'
    }),
    quantidade_estoque: joi.number().integer().min(0).required().messages({
        'number.base': 'É necessário inserir a quantidade em estoque do produto para cadastro.',
        'number.integer': 'É necessário inserir um número inteiro no campo quantidade em estoque para cadastro.',
        'number.min': 'A quantidade em estoque não pode ser um número negativo.',
        'any.required': 'É necessário inserir a quantidade em estoque do produto para cadastro.'
    }),
    valor: joi.number().integer().min(1).required().messages({
        'number.base': 'É necessário inserir o valor do produto em centavos para cadastro.',
        'number.integer': 'É necessário inserir o valor em centavos como um número inteiro para cadastro.',
        'number.min': 'O valor do produto não pode ser zero ou negativo.',
        'any.required': 'É necessário inserir o valor do produto em centavos para cadastro.'
    }),
    categoria_id: joi.number().integer().required().messages({
        'number.base': 'É necessário inserir o ID da categoria do produto para cadastro.',
        'number.integer': 'É necessário inserir o ID da categoria do produto para cadastro.',
        'any.required': 'É necessário inserir o ID da categoria do produto para cadastro.'
    }),
    produto_imagem: joi.string().allow('', null).uri().messages({
        'string.uri': 'O campo produto_imagem deve ser uma URL válida.',
    })

})

module.exports = schemaCadastroProduto