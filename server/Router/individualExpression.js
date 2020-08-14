const express = require("express")
const router = express.Router();
const individualExpression = require('../controller/individualExpressionController')
router.get('/',individualExpression.individualExpressionController)
module.exports=router