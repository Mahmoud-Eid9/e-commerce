const authController = require('../controller/auth')
const epxress = require("express")
const router = epxress.Router()

router.post('/login', authController.login)
router.post('/signup', authController.signup)
router.get('/refresh', authController.refresh)


module.exports = router;