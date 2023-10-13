const { Router } = require('express')
const PostController = require('../controllers/postController')
const auth = require('../middlewares/auth')
const { can } = require('../middlewares/accessControl')

const router = Router()

router
    .get('/posts', PostController.getPosts)
    .get('/posts/:id', PostController.getPostById)
    .get('/posts/user/:id', PostController.getPostsByUser)

router.use(auth)
    .post('/posts',can("Admin"), PostController.createPost)
    .put('/posts/:id', can("Admin"),PostController.updatePost)
    .delete('/posts/:id',can("Admin"), PostController.deletePost)


module.exports = router;