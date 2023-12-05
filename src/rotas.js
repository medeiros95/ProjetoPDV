const express = require("express");
const { listarCategorias } = require("./controladores/listarCategorias");
const { autenticaUsuario } = require("./intermediarios/autenticador");
const { login } = require("./controladores/login");
const { cadastrarUsuario } = require("./controladores/cadastrarUsuario");
const { detalharPerfil, editarUsuario } = require("./controladores/usuarios");
const { validarRequisicao } = require("./intermediarios/validarRequisicao");
const schemaLogin = require("./validacoes/schemaLogin");
const schemaCadastroUsuario = require("./validacoes/schemaCadastroUsuario");
const schemaEditarUsuario = require("./validacoes/schemaEditarUsuario");
const schemaCadastroCliente = require("./validacoes/schemaCadastroCliente");
const { cadastrarCliente } = require("./controladores/cadastrarCliente");
const schemaCadastroProduto = require("./validacoes/schemaCadastroProduto");
const schemaEditarProduto = require("./validacoes/schemaEditarProduto");
const { cadastrarProduto } = require("./controladores/cadastrarProduto");
const { listarProdutos } = require("./controladores/listarProdutos")
const { editarProduto } = require("./controladores/editarProduto");
const { detalharProduto, excluirProduto } = require("./controladores/detalharExcluirProduto");
const detalharCliente = require('./controladores/detalharCliente');
const { listarClientes } = require("./controladores/listarClientes");
const { editarCliente } = require("./controladores/editarCliente");
const schemaEditarCliente = require("./validacoes/schemaEditarCliente")

const rotas = express();

rotas.get("/categoria", listarCategorias)
rotas.post("/usuario", validarRequisicao(schemaCadastroUsuario), cadastrarUsuario)
rotas.post("/login", validarRequisicao(schemaLogin), login)

rotas.use(autenticaUsuario)
rotas.get("/usuario", detalharPerfil)
rotas.put("/usuario", validarRequisicao(schemaEditarUsuario), editarUsuario)

rotas.post('/produto', validarRequisicao(schemaCadastroProduto), cadastrarProduto)
rotas.get('/produto', listarProdutos)
rotas.put('/produto/:id', validarRequisicao(schemaEditarProduto), editarProduto)
rotas.get('/produto/:id', detalharProduto)
rotas.delete('/produto/:id', excluirProduto)

rotas.post("/cliente", validarRequisicao(schemaCadastroCliente), cadastrarCliente)
rotas.get('/cliente/:id', detalharCliente)
rotas.get('/cliente', listarClientes)
rotas.put("/cliente/:id",validarRequisicao(schemaEditarCliente), editarCliente)

module.exports = rotas;