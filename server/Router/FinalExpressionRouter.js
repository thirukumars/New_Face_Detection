const express = require('express')
const router = express.Router();
const Finalexpression = require('../controller/FinalExpressionController')
router.post('/',Finalexpression.finalExpressionController)

module.exports=router