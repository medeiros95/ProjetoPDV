const knex = require('../conexao.js');

const editarProduto = async (req, res) => {
    const {id} = req.params
    const {descricao,quantidade_estoque,valor,categoria_id} = req.body

    try {
        const produtoLocalizado = await knex('produtos').where('id',id);
        const existeCategoria = await knex('categorias').where('id',categoria_id);

        if(produtoLocalizado.length < 1){
            return res.status(400).json({mensagem:'Produto não localizado, verifique o id'}); 
        }
        if(existeCategoria.length < 1){
            return res.status(400).json({mensagem:'A categoria informada não existe'}); 
        }

        await knex('produtos').where({ id }).update({ descricao, quantidade_estoque, valor, categoria_id})
        
        return res.status(204).send();
        
    } catch (error) {
        return res.status(500).json({mensagem: 'Erro interno do servidor'})
    }
}

module.exports = {
    editarProduto
}