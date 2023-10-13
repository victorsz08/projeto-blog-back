const UserService = require('../services/userService')
const CustomError = require('../middlewares/CustomError')

const userService = new UserService();


class UserController {
    static async createUser(req, res){
        const { username, email, name, lastname, password } = req.body

        try {
            await userService.createUser({username, email, name, lastname, password})
            res.status(201).send({message:"Cadastro Concluído"})
        } catch (err) {
            if(err instanceof CustomError){
                return res.status(err.statusCode).send({message:err.message})
            }

            res.status(500).send({message:err.message})
        }
    }

    static async getUsers(req, res){
        try {
            const users = await userService.getUsers()
            res.status(200).send(users)
        } catch (err) {
            if(err instanceof CustomError){
                return res.status(err.statusCode).send({message:err.message})
            }

            res.status(500).send({message:err.message})
        }
    }

    static async getUserById(req, res){
        const id = req.user.id

        try {
            const user = await userService.getUserById(id)
            res.status(200).send(user)
        } catch (err) {
            if(err instanceof CustomError){
                return res.status(err.statusCode).send({message:err.message})
            }

            res.status(500).send({message:err.message})
        }
    }

    static async updateUser(req, res){
        const { username, email, name, lastname } = req.body
        const id = req.user.id

        try {
            const user = await userService.updateUser({id,username, email, name, lastname})
            res.status(200).send(user)
        } catch (err) {
            if(err instanceof CustomError){
                return res.status(err.statusCode).send({message:err.message})
            }

            res.status(500).send({message:err.message})
        }
    }

    static async deleteUser(req, res){
        const id = req.user.id

        try {
            await userService.deleteUser(id)
            res.status(200).send({message:"Usuário deletado"})
        } catch (err) {
            if(err instanceof CustomError){
                return res.status(err.statusCode).send({message:err.message})
            }

            res.status(500).send({message:err.message})
        }
    }
}


module.exports = UserController;