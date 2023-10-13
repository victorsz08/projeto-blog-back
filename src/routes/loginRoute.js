const LoginController = require('../controllers/loginController')
const { Router } = require('express')

const router = Router()


router
    .post('/login', LoginController.login)
    .post('/logout', LoginController.logout)

module.exports = router;