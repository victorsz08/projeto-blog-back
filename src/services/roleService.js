const db = require('../database/models')
const { v4:uuidv4 } = require('uuid')
const CustomError = require('../middlewares/CustomError')


class RoleService {
    async createRole(dto){
        if(dto.name === "" || dto.description === ""){
            throw new CustomError("Todos os campos são obrigatórios", 400)
        }
        const roleExists = await db.roles.findOne({
            where: {
                name: dto.name
            }
        })

        if(roleExists){
            throw new CustomError("Já existe um cargo com esse nome", 400)
        }

        const newRole = await db.roles.create({
            id: uuidv4(),
            name: dto.name,
            description: dto.description
        })

        return newRole;
    }

    async getRoles(){
        const roles = await db.roles.findAll()

        if(roles.length === 0){
            throw new CustomError("Nenhuma role cadastrada", 404)
        }

        return roles;
    }

    async getRoleById(id){
        const role = await db.roles.findByPk(id)

        if(!role){
            throw new CustomError("Role não cadastrada", 404)
        }

        return role;
    }

    async updateRole(dto){
        const role = await this.getRoleById(dto.id)

        if(dto.name !== role.name){
            const roleExists = await db.roles.findOne({
                where: {
                    name: dto.name
                }
            })

            if(roleExists){
                throw new CustomError("Já existe um cargo com esse nome", 400)
            }

            role.name = dto.name
        }

        if(dto.description){
            role.description = dto.description
        }

        await role.save()

        return role;
    }

    async deleteRole(id){
        const role = await this.getRoleById(id)

        await db.roles.destroy({
            where: {
                id: role.id
            }
        })

        return
    }
}

module.exports = RoleService;