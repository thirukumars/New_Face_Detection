const express = require("express")
const router = express.Router();
const overallExpression = require('../controller/overallExpressionController')
router.get('/',overallExpression.overallExpressionController)
module.exports=router