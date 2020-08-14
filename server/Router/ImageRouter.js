const express = require('express');
const router = express.Router();
const ImageController = require('../controller/ImageController')
router.get('/',ImageController.ImageController)
module.exports = router;