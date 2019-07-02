var express = require('express');
var router = express.Router();
var feeSubCtrl = require('../controllers/feeSubCtrl')

router.post('/add',feeSubCtrl.add);

router.get('/getAll',feeSubCtrl.getAll);

router.post('/delFeeSub',feeSubCtrl.delFeeSub);

router.get('/getAllbyType',feeSubCtrl.getAllbytype);

module.exports = router;