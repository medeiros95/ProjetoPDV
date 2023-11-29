const knex = require('../conexao')
const {senhaJwt} = require('../../senhaJwt')
const jwt = require('jsonwebtoken')
const{verificarSenha} = require('../intermediarios/bcrypt')

const login = async (req,res)=>{
    const {email, senha} = req.body;
    try {
    const usuario = await knex('usuarios').where('email', email);

    if(email === null || senha === null){
        return res.status(400).json({mensagem:'Digite email e senha para login.'})
    }

    if(usuario.length<1){
        return res.status(400).json({mensagem:'Usuario ou senha incorretos.'})
    }

    const autorizado = await verificarSenha(senha, usuario[0].senha);
    
    if(!autorizado){
        return res.status(400).json({mensagem:'Usuario ou senha incorretos.'})
    }

    const token = jwt.sign({id: usuario[0].id}, senhaJwt, {expiresIn: '8h'})

    return res.status(200).json({token})

    } catch (error) {
        return res.status(500).json({mensagem: 'Erro interno do servidor'})
    }
    
}

module.exports={
    login
}