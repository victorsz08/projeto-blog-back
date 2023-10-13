const { Router } = require('express')
const UserController = require('../controllers/userController')
const auth = require('../middlewares/auth')
const { can } = require('../middlewares/accessControl')

const router = Router()

router.use(auth)
    .post('/users/create',can("Admin"), UserController.createUser)
    .get('/users', UserController.getUsers)
    .get('/user/account', UserController.getUserById)
    .put('/user/update', UserController.updateUser)
    .delete('/user/delete', UserController.deleteUser)

module.exports = router;