const PostService = require('../services/postService')
const CustomError = require('../middlewares/CustomError')

const postService = new PostService();


class PostController {
    static async createPost(req, res){
        const { content } = req.body
        const userId = req.user.id

        try {
            const post = await postService.createPost({content, userId})
            res.status(201).send(post)
        } catch (err) {
            if(err instanceof CustomError){
                return res.status(err.statusCode).send({message:err.message})
            }

            res.status(500).send({message:err.message})
        }
    }

    static async getPosts(req, res){
        try {
            const posts = await postService.getPosts()
            res.status(200).send(posts)
        } catch (err) {
            if(err instanceof CustomError){
                return res.status(err.statusCode).send({message:err.message})
            }

            res.status(500).send({message:err.message})
        }
    }

    static async getPostById(req, res){
        const { id } = req.params

        try {
            const post = await postService.getPostById(id)
            res.status(200).send(post)
        } catch (err) {
            if(err instanceof CustomError){
                return res.status(err.statusCode).send({message:err.message})
            }

            res.status(500).send({message:err.message})
        }
    }

    static async getPostsByUser(req, res){
        const { id } = req.params

        try {
            const posts = await postService.getPostsByUser(id)
            res.status(200).send(posts)
        } catch (err) {
            if(err instanceof CustomError){
                return res.status(err.statusCode).send({message:err.message})
            }

            res.status(500).send({message:err.message})
        }
    }

    static async updatePost(req, res){
        const { content } = req.body
        const { id } = req.params

        try {
            const post = await postService.updatePosts({content, id})
            res.status(200).send(post)
        } catch (err) {
            if(err instanceof CustomError){
                return res.status(err.statusCode).send({message:err.message})
            }

            res.status(500).send({message:err.message})
        }

    }

    static async deletePost(req, res){
        const { id } = req.params

        try {
            await postService.deletePost(id)
            res.status(200).send({message:"Postagem deletada"})
        } catch (err) {
            if(err instanceof CustomError){
                return res.status(err.statusCode).send({message:err.message})
            }

            res.status(500).send({message:err.message})
        }
    }
}

module.exports = PostController;