const joi = require('joi')

const schemaProdutos = joi.object({
    produto_id: joi.number().integer().min(0).required().messages({
        'number.base': 'É necessário inserir o id do produto.',
        'number.integer': 'É necessário inserir um número inteiro no campo produto_id.',
        'number.min': 'O id do produto não pode ser um número negativo.',
        'any.required': 'É necessário inserir o id do produto.'
    }),
    quantidade_produto: joi.number().integer().min(1).required().messages({
        'number.base': 'É necessário inserir a quantidade de produtos.',
        'number.integer': 'É necessário inserir um numero inteiro na quantidade de produtos.',
        'number.min': 'A quantidade de produtos não pode ser zero ou negativo.',
        'any.required': 'É necessário inserir a quantidade de produtos.'
    }),
})

const schemaCadastroPedido = joi.object({
    cliente_id: joi.number().integer().min(0).required().messages({
        'number.base': 'É necessário inserir o Id do Cliente.',
        'number.integer': 'É necessário inserir um número inteiro no campo cliente_id.',
        'number.min': 'O Id do cliente não pode ser um numero negativo.',
        'any.required': 'É necessário inserir o Id do Cliente.'
    }),
    observacao: joi.string().optional(),
    pedido_produtos: joi.array().items(schemaProdutos).min(1).required().messages({
        'number.min': 'É necessário inserir pelo menos 1 produto',
        'any.required': 'É necessário inserir pelo menos 1 produto'
    }),
})


module.exports = schemaCadastroPedido;
