const express = require("express")
const router = express.Router();
const DateController = require('../controller/DateController')

router.get('/',DateController.FromDate)
router.post('/',DateController.postDate)
module.exports = router;