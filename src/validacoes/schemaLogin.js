const joi = require('joi')

const schemaLogin = joi.object({
    email: joi.string().required().email(),
    senha: joi.string().required()
})

module.exports = schemaLogin
