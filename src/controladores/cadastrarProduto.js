const knex = require('../conexao');

const cadastrarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    try {
        const categoriaExiste = await knex('categorias')
            .where('id', categoria_id)
            .first();

        if (!categoriaExiste) {
            return res.status(400).json('A categoria informada não existe.');
        }

        const produtoCadastrado = await knex('produtos').insert({
            descricao, 
            quantidade_estoque, 
            valor, 
            categoria_id
        }).returning('*')

        return res.status(200).json(produtoCadastrado[0]);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports ={
    cadastrarProduto
}