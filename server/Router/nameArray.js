const express = require('express')
const router = express.Router();
const nameArrayController = require("../controller/nameArrayController")
// const getnameArrayController = require("../controller/nameArrayController")

router.post('/',nameArrayController.nameArrayController)
router.get('/',nameArrayController.getNameArrayController)
module.exports = router

