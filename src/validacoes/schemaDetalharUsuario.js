const joi = require('joi')

const schemaDetalharUsuario = joi.object({
    nome: joi.string().required(),
    email: joi.string().required().email(),
    senha: joi.string().required()
})

module.exports = schemaDetalharUsuario