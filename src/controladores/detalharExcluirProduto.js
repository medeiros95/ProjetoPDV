const knex = require("../conexao");
const { excluirImagem } = require("../armazenamento");

const detalharProduto = async (req, res) => {
  const { id } = req.params;
  try {
    const produtoEncontrado = await knex("produtos").where({ id });

    if (produtoEncontrado.length === 0) {
      return res.status(404).json("Produto não encontrado");
    }

    return res.status(200).json(produtoEncontrado[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const excluirProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const produtoEncontrado = await knex('produtos').where({ id }).first();

    if (!produtoEncontrado) {
      return res.status(404).json("Produto não encontrado");
    }

    const { produto_imagem } = produtoEncontrado;

    const produtoPedido = await knex('pedido_produtos').where({ produto_id: id})
    if(produtoPedido.length > 0){
        return res.status(404).json({ mensagem: 'Este produto não pode ser excluído, um pedido ainda o contém!'})
    }

    if (produto_imagem !== null) {
      const nomeArquivo = produto_imagem.split('/').pop(); 
      if(nomeArquivo){
      await excluirImagem(`imagemProdutos/${nomeArquivo}`);
      }
    }

    await knex("produtos").where({ id }).del({});

    return res.status(200).send();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = {
  detalharProduto,
  excluirProduto,
}
