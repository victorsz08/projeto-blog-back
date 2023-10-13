const SecurityService = require('../services/securityService')
const CustomError = require('../middlewares/CustomError')

const securityService = new SecurityService()

class SecurityController {
    static async createAcl(req, res){
        const { roleId, userId } = req.body

        try {
            const acl = await securityService.createAcl({roleId, userId})
            res.status(201).send(acl)
        } catch (err) {
            if(err instanceof CustomError){
                return res.status(err.statusCode).send({message: err.message})
            }

            res.status(500).send({message: err.message})
        }
    }

    static async getAcls(req, res){
        try {
            const acls = await securityService.getAcls()
            res.status(200).send(acls)
        } catch (err) {
            if(err instanceof CustomError){
                return res.status(err.statusCode).send({message: err.message})
            }

            res.status(500).send({message: err.message})
        }
    }

    static async getAclById(req, res){
        const  id  = req.params.id

        try {
            const acl = await securityService.getAclById(id)
            res.status(200).send(acl)
        } catch (err) {
            if(err instanceof CustomError){
                return res.status(err.statusCode).send({message: err.message})
            }

            res.status(500).send({message: err.message})
        }
    }

    static async deleteAcl(req, res){
        const { id } = req.params

        try {
            await securityService.deleteAcl(id)
            res.status(200).send({message:"Acl deletada"})
        } catch (err) {
            if(err instanceof CustomError){
                return res.status(err.statusCode).send({message: err.message})
            }

            res.status(500).send({message: err.message})
        }
    }
}

module.exports = SecurityController;