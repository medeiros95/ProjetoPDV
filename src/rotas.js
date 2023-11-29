const express = require("express");
const { listarCategorias } = require("./controladores/listarcategorias.js");
const { autenticaUsuario } = require("./intermediarios/autenticador");
const { login } = require("./controladores/login");
const { cadastrarUsuario } = require("./controladores/cadastrarUsuario");
const { detalharPerfil, editarUsuario } = require("./controladores/usuarios");

const rotas = express();

rotas.get("/categoria", listarCategorias);

rotas.post("/usuario", cadastrarUsuario);

rotas.post("/login", login);

rotas.use(autenticaUsuario);

rotas.get("/usuario", detalharPerfil);
rotas.put("/usuario", editarUsuario);

module.exports = rotas;
