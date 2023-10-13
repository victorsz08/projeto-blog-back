const { Router } = require('express')
const RoleController = require('../controllers/roleController')
const auth = require('../middlewares/auth')
const { can } = require('../middlewares/accessControl')

const router = Router()


router.use(auth)

router
    .post('/roles',can("Admin"), RoleController.createRole)
    .get('/roles/:id',can("Admin"), RoleController.getRoleById)
    .get('/roles',can("Admin"), RoleController.getRoles)
    .put('/roles/:id', can("Admin"),RoleController.updateRole)
    .delete('/roles/:id', can("Admin"),RoleController.deleteRole)

module.exports = router;
