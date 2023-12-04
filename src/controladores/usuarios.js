const knex = require("../conexao");
const { criptografarSenha } = require("../intermediarios/bcrypt");

const detalharPerfil = async (req, res) => {
  return res.status(200).json(req.usuario[0]);
};

const editarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  const { id } = req.usuario[0];

  try {
    if (email !== req.usuario[0].email) {
      const emailUsuarioExiste = await knex("usuarios")
        .where({ email })
        .first();

      if (emailUsuarioExiste) {
        return res.status(400).json({
          mensagem: "O email já cadastrado.",
        });
      }
    }

    await knex("usuarios")
      .where({ id })
      .update({
        nome: nome ? nome : req.usuario.nome,
        email: email ? email : req.usuario.email,
        senha: senha ? await criptografarSenha(senha) : req.usuario.senha,
      });

    return res.status(201).send();
  } catch (error) {
    res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = {
  detalharPerfil,
  editarUsuario,
};
