const express = require('express')
const router = express.Router();
 const DownloadController = require('../controller/DownloadController')
router.post('/',DownloadController.DownloadController)
module.exports = router