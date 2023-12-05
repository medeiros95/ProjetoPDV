const knex = require("../conexao");

const detalharCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const clienteEncontrado = await knex("clientes").where({ id });

    if (clienteEncontrado.length === 0) {
      return res.status(404).json("Cliente não encontrado.");
    }

    return res.status(200).json(clienteEncontrado[0]);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = detalharCliente;
