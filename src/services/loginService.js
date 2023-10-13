const db = require('../database/models')
const { compare } = require('bcryptjs')
const jsonSecret = require('../database/config/jsonSecret')
const { sign } = require('jsonwebtoken')
const CustomError = require('../middlewares/CustomError')

class LoginService {
    async login(dto){
        if(dto.email === "" || dto.password === ""){
            throw new CustomError("Todos os campos são obrigatórios", 400)
        }


        const user = await db.users.findOne({
            where: {
                email: dto.email
            }
        })

        if(!user){
            throw new CustomError("Email ou senha incorretos", 400)
        }

        const pass = await compare(dto.password, user.password)

        if(!pass){
            throw new CustomError("Email ou senha incorretos", 400)
        }

        const payload = sign({
            id: user.id,
            email: user.email
        }, jsonSecret.secret, { expiresIn: '1d'})

        return payload;
    }

    async logout(token){
        if(!token){
            throw new CustomError("Token não informado", 400)
        }

        const [, accessToken] = token.split(" ")

        const accessTokenExists = await db.blacklist.findOne({
            where: {
                token: accessToken
            }
        })

        if(accessTokenExists){
            throw new CustomError("Token já revogado", 401)
        }

        await db.blacklist.create({
            token: accessToken
        })

        return
    }
}

module.exports = LoginService;
