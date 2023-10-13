const LoginService = require('../services/loginService')
const CustomError = require('../middlewares/CustomError')

const loginService = new LoginService()

class LoginController {
    static async login(req, res){
        const { email, password } = req.body

        try {
            const access_token = await loginService.login({email,password})
            res.status(200).send({access_token})
        } catch (err) {
            if(err instanceof CustomError){
                return res.status(err.statusCode).send({message:err.message})
            }

            res.status(500).send({message:err.message})
        }
    }

    static async logout(req, res){
        const token = req.headers.authorization

        try {
            await loginService.logout(token)
            res.status(200).send({message:"Logout efetuado com sucesso"})
        } catch (err) {
            if(err instanceof CustomError){
                return res.status(err.statusCode).send({message:err.message})
            }

            res.status(500).send({message:err.message})
        }
    }
}

module.exports = LoginController;