const RoleService = require('../services/roleService')
const CustomError = require('../middlewares/CustomError')

const roleService = new RoleService()

class RoleController {
    static async createRole(req, res){
        const { name, description } = req.body

        try {
            await roleService.createRole({name, description})
            res.status(201).send({message:"Cargo cadastrado com sucesso"})
        } catch (err) {
            if(err instanceof CustomError){
                return res.status(err.statusCode).send({message:err.message})
            }

            res.status(500).send({message:err.message})
        }
    }

    static async getRoles(req, res){
        try {
            const roles = await roleService.getRoles()
            res.status(200).send(roles)
        } catch (err) {
            if(err instanceof CustomError){
                return res.status(err.statusCode).send({message:err.message})
            }

            res.status(500).send({message:err.message})
        }
    }

    static async getRoleById(req, res){
        const { id } = req.params

        try {
            const role = await roleService.getRoleById(id)
            res.status(200).send(role)
        } catch (err) {
            if(err instanceof CustomError){
                return res.status(err.statusCode).send({message:err.message})
            }

            res.status(500).send({message:err.message})
        }
    }

    static async updateRole(req, res){
        const { id } = req.params
        const { name, description } = req.body

        try {
            const role = await roleService.updateRole({id, name, description})
            res.status(200).send(role)
        } catch (err) {
            if(err instanceof CustomError){
                return res.status(err.statusCode).send({message:err.message})
            }

            res.status(500).send({message:err.message})
        }
    }

    static async deleteRole(req, res){
        const { id } = req.params

        try {
            await roleService.deleteRole(id)
            res.status(200).send({message:"Cargo deletado"})
        } catch (err) {
            if(err instanceof CustomError){
                return res.status(err.statusCode).send({message:err.message})
            }

            res.status(500).send({message:err.message})
        }
    }
}

module.exports = RoleController;