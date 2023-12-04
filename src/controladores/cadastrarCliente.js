const knex = require('../conexao');

const cadastrarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body

    try {
        const emailCadastrado = await knex('clientes').where({ email }).first()
        if(emailCadastrado){
            return res.status(400).json({ mensagem: 'Email já cadastrado' })
        }
        const cpfCadastrado = await knex('clientes').where({ cpf }).first()
        if(cpfCadastrado){
            return res.status(400).json({ mensagem: 'Cpf já cadastrado' })
        }

        const cliente = { nome, email, cpf, cep, rua, numero, bairro, cidade, estado }

        await knex('clientes').insert(cliente)
        return res.status(201).json(cliente)     
    } 
    catch (error) {
        res.status(500).json({ mensagem: error });
    }
}

module.exports = {
    cadastrarCliente
}