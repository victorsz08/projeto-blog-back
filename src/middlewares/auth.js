const { verify, decode } = require('jsonwebtoken')
const jsonSecret = require('../database/config/jsonSecret')
const db = require('../database/models')

async function auth(req, res, next){


    const token = req.headers.authorization

    
    if(!token){
        return res.status(401).send({message:"Access token não informado"})
    }
    
    const [, access_token] = token.split(" ")
    
    
    const tokenrevoged = await db.blacklist.findOne({
        where: {
            token:access_token
        }
    })

    if(tokenrevoged){
        return res.status(401).send({message:"Token revogado"})
    }

    try {
        verify(access_token,jsonSecret.secret)

        const decoded = decode(access_token)

        req.user = decoded

        next()

    } catch (err) {
        res.status(500).send({message: err.message + "Usuário não autorizado"})
    }
}


module.exports = auth;