const knex = require('../conexao.js');
const { uploadImagemProduto } = require('../armazenamento');

const editarProduto = async (req, res) => {
    const { id } = req.params;
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    try {
        const produtoLocalizado = await knex('produtos').where('id', id);
        const existeCategoria = await knex('categorias').where('id', categoria_id);

        if (produtoLocalizado.length < 1) {
            return res.status(400).json({ mensagem: 'Produto não localizado, verifique o id' });
        }
        if (existeCategoria.length < 1) {
            return res.status(400).json({ mensagem: 'A categoria informada não existe' });
        }

        let produto_imagem_url = produtoLocalizado[0].produto_imagem; 

        if (req.file) {
            const imagemUploadResultado = await uploadImagemProduto(
                `imagemProdutos/${req.file.originalname}`,
                req.file.buffer,
                req.file.mimetype
            );

            produto_imagem_url = imagemUploadResultado.url;
        }

        await knex('produtos').where({ id }).update({
            descricao,
            quantidade_estoque,
            valor,
            categoria_id,
            produto_imagem: produto_imagem_url,
        });

        return res.status(204).send();

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

module.exports = {
    editarProduto
};