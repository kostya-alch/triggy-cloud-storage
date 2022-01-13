const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/auth.user.middleware');
const FileController = require('../controllers/FileController');

router.post('', authMiddleware, FileController.createDir);
router.post('/upload', authMiddleware, FileController.uploadFile);
router.post('/avatar', authMiddleware, FileController.uploadAvatar);
router.get('', authMiddleware, FileController.fetFiles);
router.get('/download', authMiddleware, FileController.downloadFile);
router.get('/search', authMiddleware, FileController.searchFile);
router.delete('/', authMiddleware, FileController.deleteFile);
router.delete('/avatar', authMiddleware, FileController.deleteAvatar);

module.exports = router;
