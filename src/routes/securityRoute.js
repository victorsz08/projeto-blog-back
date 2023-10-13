const SecurityController = require('../controllers/securityController')
const { Router } = require('express')
const auth = require('../middlewares/auth')
const { can } = require('../middlewares/accessControl')

const router = Router()


router.use(auth)
    .post('/security/acl', can("Admin"),SecurityController.createAcl)
    .get('/security/acl', can("Admin"),SecurityController.getAcls)
    .get('/security/acl/role/:id', can("Admin"),SecurityController.getAclById)
    .delete('/security/acl/user/:id', can("Admin"),SecurityController.deleteAcl)


module.exports = router;