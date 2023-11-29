const knex = require('../conexao');
const {senhaJwt} = require('../../senhaJwt')
const jwt = require('jsonwebtoken');

const autenticaUsuario = async(req,res,next)=>{
    const {authorization} = req.headers;

    try {
        if(!authorization){
            return res.status(401).json({mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.'})
        }
    
        const token = authorization.split(' ')[1]

        if(!token){
            return res.status(401).json({mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.'})
        }

        const {id} = jwt.verify(token ,senhaJwt);

        const usuario = await knex('usuarios').where('id', id);

        if(!usuario){
            return res.status(401).json({mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.'})
        }

        req.usuario = usuario
        next();

    } catch (error) {
        if(error.message === 'invalid signature' || error.message === 'invalid token' ){
            return res.status(401).json({mensagem:'Para acessar este recurso um token de autenticação válido deve ser enviado.'});
        }
        return res.status(500).json({mensagem:'Erro interno do servidor'})
    }
}
module.exports={
    autenticaUsuario
}
