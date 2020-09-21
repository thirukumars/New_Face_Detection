var express = require('express')
var router  = express.Router()
var DetailsController = require('../controller/DetailsController')
router.post('/',DetailsController.DetailsController);
router.get('/',DetailsController.getDetailsController)
module.exports=router;