const db = require('../database/models')

function can(role){
    return async (req, res, next) => {
        const userId = req.user.id

        try {
            const user = await db.users.findByPk(userId, {
                include: {
                    model: db.roles,
                    as:'user_role',
                    attributes: ['id','name']
                }
            })

        if(!user){
            return res.status(404).send({message:"Usuário não encontrado"})
        }
        
        const roleUser = user.user_role.map(role => role.name)
        
        console.log(roleUser)

        if(roleUser[0] !== role){
            return res.status(401).send({message: "Usuário não autrizado para esta rota"})
        }

        next()

        } catch (err) {
            res.status(500).send({message:"Erro interno do servidor" + err.message})
        }

        
    }
}

module.exports = {
    can
}  ;
    