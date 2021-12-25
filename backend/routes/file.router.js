const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/auth.user.middleware')
const FileController = require('../controllers/FileController')

router.post('', authMiddleware, FileController.createDir)
router.get('', authMiddleware, FileController.fetFiles)


module.exports = router