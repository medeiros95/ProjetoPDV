const knex = require('../conexao');
const { uploadImagemProduto } = require('../armazenamento');

const cadastrarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  
    try {
        const categoriaExiste = await knex('categorias')
            .where('id', categoria_id)
            .first();

        if (!categoriaExiste) {
            return res.status(400).json('A categoria informada não existe.');
        }

        let produto_imagem_url = null; 

        if (req.file) {
        const imagemUploadResultado = await uploadImagemProduto(
            `imagemProdutos/${req.file.originalname}`, 
            req.file.buffer,
            req.file.mimetype
        );

        produto_imagem_url = imagemUploadResultado.url;
        }

        const produtoCadastrado = await knex('produtos').insert({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
        produto_imagem: produto_imagem_url, 
        }).returning('*');

        return res.status(200).json(produtoCadastrado[0]);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

module.exports = {
    cadastrarProduto
};
