const express = require('express');
const router = express.Router();
const {xyz}=require('./controller');

router.get('/',xyz)

module.exports=router;