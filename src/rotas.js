const express = require("express");
const { listarCategorias } = require("./controladores/listarCategorias");
const { autenticaUsuario } = require("./intermediarios/autenticador");
const { login } = require("./controladores/login");
const { cadastrarUsuario } = require("./controladores/cadastrarUsuario");
const { detalharPerfil, editarUsuario } = require("./controladores/usuarios");
const {validarRequisicao} = require("./intermediarios/validarRequisicao");
const schemaLogin  = require("./validacoes/schemaLogin");
const schemaCadastroUsuario  = require("./validacoes/schemaCadastroUsuario");
const schemaDetalharUsuario  = require("./validacoes/schemaDetalharUsuario");




const rotas = express();

rotas.get("/categoria", listarCategorias);
rotas.post("/usuario", validarRequisicao(schemaCadastroUsuario),cadastrarUsuario);
rotas.post("/login", validarRequisicao(schemaLogin),login);

rotas.use(autenticaUsuario);
rotas.get("/usuario", detalharPerfil);
rotas.put("/usuario",validarRequisicao(schemaDetalharUsuario), editarUsuario);

module.exports = rotas;
