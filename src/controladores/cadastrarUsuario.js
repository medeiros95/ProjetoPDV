const knex = require('../conexao');
const { criptografarSenha } = require('../intermediarios/bcrypt')

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body
    
    try {
        const emailCadastrado = await knex('usuarios').where({ email }).first()

        if(emailCadastrado){
            return res.status(400).json({ mensagem: 'Email já cadastrado' })
        }

        const usuario = {
            nome,
            email,
            senha: await criptografarSenha(senha)
        }

        await knex('usuarios').insert(usuario)

        return res.status(201).json(usuario)
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

module.exports = {
    cadastrarUsuario
}