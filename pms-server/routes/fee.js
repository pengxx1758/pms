var express = require('express');
var router = express.Router();
var feeCtrl = require('../controllers/feeCtrl')

router.post('/add',feeCtrl.add);

router.post('/addFeeItem',feeCtrl.addFeeItem);

router.get('/getAllFeeItem',feeCtrl.getAllFeeItem);

router.get('/getAllSysFee',feeCtrl.getAllSysFee);

router.get('/getAllHouserFee',feeCtrl.getAllHouserFee);

router.post('/delFeeItem',feeCtrl.delFeeItem);

router.post('/updateFee',feeCtrl.updateFee);

router.post('/updateFeeState',feeCtrl.updateFeeState);

module.exports = router;