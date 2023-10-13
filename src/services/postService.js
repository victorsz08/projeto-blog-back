const db = require('../database/models')
const CustomError = require('../middlewares/CustomError')


class PostService {
    async createPost(dto){
        const user = await db.users.findByPk(dto.userId, {
            attributes: {
                exclude: ['password']
            }
        })

        if(!user){
            throw new CustomError("Usuário não encontrado", 404)
        }

        const post = await db.posts.create({
            content: dto.content
        })

        await post.setPost_user(user)

        const newPost = await db.posts.findByPk(post.id, {
            include: {
                model: db.users,
                as: 'post_user',
                attributes: ['id','username','name','lastname']
            }
        })

        return newPost;
    }

    async getPosts(){
        const posts = await db.posts.findAll({
            include: {
                model: db.users,
                as: 'post_user',
                attributes:['id','username','name','lastname']
            }
        })

        if(posts.length === 0){
            throw new CustomError("Nenhuma postagem encontrada", 404)
        }

        return posts;
    }

    async getPostById(id){
        const post = await db.posts.findByPk(id, {
            include: {
                model: db.users,
                as: 'post_user',
                attributes:['id','username','name','lastname']
            }
        })

        if(!post){
            throw new CustomError("Postagem não encontrado", 404)
        }

        return post;
    }

    async getPostsByUser(id){
        const posts = await db.posts.findAll({
            where: {
                user_id: id
            }
        })

        if(posts.length === 0){
            throw new CustomError("Nenhuma postagem encontrada para este usuário", 404)
        }

        return posts;
    }

    async updatePosts(dto) {
        const post = await db.posts.findByPk(dto.id)

        if(!post){
            throw new CustomError("Postagem não encontrada", 404)
        }

        if(dto.content){
            post.content = dto.content
        }

        await post.save()

        return post;
    }

    async deletePost(id){
        const post = await this.getPostById(id)

        await db.posts.destroy({
            where: {
                id: post.id
            }
        })

        return
    }

}

module.exports = PostService;