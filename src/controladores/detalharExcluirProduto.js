const knex = require('../conexao');

const detalharProduto = async (req, res) => {
    const { id } = req.params
    try {
        const produtoEncontrado = await knex('produtos').where({ id })

        if (produtoEncontrado.length === 0) {
            return res.status(404).json('Produto não encontrado');
        }

        return res.status(200).json(produtoEncontrado[0])
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

const excluirProduto = async (req, res) => {
    const { id } = req.params
    try {
        const produtoEncontrado = await knex('produtos').where({ id })

        if (produtoEncontrado.length === 0) {
            return res.status(404).json('Produto não encontrado');
        }

        await knex('produtos').where({ id }).del({});

        return res.status(200).json('produto excluido com sucesso')

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}



module.exports = {
    detalharProduto,
    excluirProduto
};