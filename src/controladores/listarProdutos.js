const knex = require('../conexao.js');

const listarProdutos = async (req, res) => {
    const {categoria_id} = req.query

    try {
        if(categoria_id){
            const produtoFiltrado = await knex('produtos').where('id',categoria_id);

            if(produtoFiltrado.length < 1){
            return res.status(400).json({mensagem:'Esse id não pertence a nenhum produto'}); 
            }

            return res.status(200).json(produtoFiltrado);
        }

        const produtos = await knex('produtos')
        return res.status(200).json(produtos)
        
    } catch (error) {
        return res.status(500).json({mensagem: 'Erro interno do servidor'})
    }
}

module.exports = {
    listarProdutos
}