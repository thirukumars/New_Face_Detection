const express = require("express")
const router = express.Router();
const DateTimeController = require('../controller/DateTimeController')

router.get('/',DateTimeController.DateTimeController)
// router.post('/',DateController.postDate)
module.exports = router;