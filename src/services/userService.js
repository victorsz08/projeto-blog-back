const db = require('../database/models')
const { hash } = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')
const CustomError = require('../middlewares/CustomError')


class UserService {
    async createUser(dto){

        if(dto === ""){
            throw new CustomError("Todos os campos são obrigatórios", 400)
        }

        if(!dto.username || !dto.email || !dto.name || !dto.lastname || !dto.password){
            throw new CustomError("Todos os campos são obrigatórios", 400)
        }

        const user = await db.users.findOne({
            where:{
                username: dto.username
            }
        })

        const emailExists = await db.users.findOne({
            where: {
                email: dto.email
            }
        })
        
        if(user){
            throw new CustomError("O username já está em uso", 400)
        }

        if(emailExists){
            throw new CustomError("O email já está em uso", 400)
        }

        const passHash = await hash(dto.password, 10)

        await db.users.create({
            id: uuidv4(),
            username: dto.username,
            email: dto.email,
            name: dto.name,
            lastname: dto.lastname,
            password: passHash
        })

        return

    }

    async getUsers(){
        const users = await db.users.findAll({
            attributes: {
                exclude: ['password']
            }
        })

        if(users.length === 0){
            throw new CustomError("Nenhum usuário encontrado", 404)
        }

        return users;
    }

    async getUserById(id){
        const user = await db.users.findByPk(id, {
            attributes: {
                exclude: ['password']
            },
            include: {
                model: db.roles,
                as: 'user_role',
                attributes: ['id','name']
            }
        })

        if(!user){
            throw new CustomError("Usuário não encontrado", 404)
        }

        return user;
    }

    async updateUser(dto){
        const user = await this.getUserById(dto.id)

        if(dto.username !== user.username){
            const usernameExists = await db.users.findOne({
                where: {
                    username: dto.username
                }
            })

            if(usernameExists){
                throw new CustomError("O username já esta em uso", 400)
            }

            user.username = dto.username
        }

        if(dto.email !== user.email){
            const emailExists = await db.users.findOne({
                where: {
                    email: dto.email
                }
            })

            if(emailExists){
                throw new CustomError("O email já está em uso", 400)
            }

            user.email = dto.email
        }

        if(dto.name){
            user.name = dto.name
        }

        if(dto.lastname){
            user.name = dto.name
        }
        
        await user.save()

        return user;
    }

    async deleteUser(id){
        const user = await this.getUserById(id)

        await db.users.destroy({
            where: {
                id: user.id
            }
        })

        return
    }
}


module.exports = UserService;