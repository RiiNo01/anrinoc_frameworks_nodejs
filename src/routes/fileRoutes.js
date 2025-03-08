const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const fileController = require('../controllers/fileController');

router.post('/upload', upload.single('file'), fileController.uploadFile);
router.get('/files', fileController.listFiles);
router.get('/download/:filename', fileController.downloadFile);
router.delete('/delete/:filename', fileController.deleteFile);

module.exports = router;
