const db = require('../database/models')
const CustomError = require('../middlewares/CustomError')



class SecurityService {
    async createAcl(dto){
        const user = await db.users.findByPk(dto.userId, {
            include: {
                model: db.roles,
                as: 'user_role',
                attributes: ['id','name','description']
            },
            attributes: {
                exclude: ['password']
            }
        })

        if(!user){
            throw new CustomError("Usuário não encontrado", 404)
        }

        const role = await db.roles.findByPk(dto.roleId)

        if(!role){
            throw new CustomError("Cargo não encontrado", 404)
        }

        await user.removeUser_role(user.user_role)

        await user.setUser_role(role)

        const newUser = await db.users.findByPk(user.id, {
            include: {
                model: db.roles,
                as: 'user_role',
                attributes: ['id','name','description']
            },

            attributes: {
                exclude: ['password']
            }
        })

        return newUser;

    }

    async getAcls(){
        const acl = await db.users.findAll({
            include: {
                model: db.roles,
                as: 'user_role',
                attributes: ['id','name','description']
            },
            attributes: {
                exclude: ['password']
            }
        })

        return acl;
    }

    async getAclById(id){
        const usersAcl = await db.roles.findAll({
            include: {
                model: db.users,
                as: 'role_user',
                attributes: ['id','username','name']
            },
            
            where: {
                id: id
            }
        })

        if(usersAcl.length === 0){
            throw new CustomError("Nenhuma Acl cadastrada para este cargo", 404)
        }

        return usersAcl;
    }

    async deleteAcl(id){
        const user = await db.users.findByPk(id, {
            include: {
                model: db.roles,
                as: 'user_role',
                attributes: ['id','name','description']
            }
        })

        if(!user){
            throw new CustomError("Acl não cadastrada para este usuário", 404)
        }

        await user.removeUser_role(user.user_role)

        return
    }
}

module.exports = SecurityService;