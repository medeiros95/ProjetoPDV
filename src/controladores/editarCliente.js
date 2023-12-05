const knex = require("../conexao.js");

const editarCliente = async (req, res) => {
  const { id } = req.params;
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

  try {
    const clientesEncontrados = await knex("clientes").where({ id });

    if (clientesEncontrados.length === 0) {
      return res.status(404).json({ mensagem: "Cliente não encontrado" });
    }

    const emailExistente = await knex("clientes")
      .whereNot("id", id)
      .andWhere("email", email)
      .first();

    if (emailExistente) {
      return res.status(400).json({ mensagem: "Email já cadastrado" });
    }

    const cpfExistente = await knex("clientes")
      .whereNot("id", id)
      .andWhere("cpf", cpf)
      .first();

    if (cpfExistente) {
      return res.status(400).json({ mensagem: "Cpf já cadastrado" });
    }

    const ClienteAtualizado = await knex("clientes")
      .update({
        nome: nome ? nome : req.usuario.nome,
        email: email ? email : req.usuario.email,
        cpf: cpf ? cpf : req.usuario.cpf,
        cep: cep ? cep : req.usuario.cep,
        rua: rua ? rua : req.usuario.rua,
        numero: numero ? numero : req.usuario.numero,
        bairro: bairro ? bairro : req.usuario.bairro,
        cidade: cidade ? cidade : req.usuario.cidade,
        estado: estado ? estado : req.usuario.estado,
      })
      .where("id", id)
      .returning("*");

    return res.status(200).json(ClienteAtualizado[0]);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = {
  editarCliente,
};
