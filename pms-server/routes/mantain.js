var express = require('express');
var router = express.Router();
var maintainCtrl = require('../controllers/maintainCtrl')

router.post('/add',maintainCtrl.addMaintain);

// 住户列表
router.get('/getHouserList',maintainCtrl.getHouserList);
// 系统列表
router.get('/getSysList',maintainCtrl.getSysList);

router.get('/getDetailById',maintainCtrl.getDetailById);

router.post('/checkMaintain',maintainCtrl.checkMaintain);

router.post('/acceptMaintain',maintainCtrl.acceptMiantain);

router.post('/cancelMaintain',maintainCtrl.cancelMaintain);

router.get('/getAddress',maintainCtrl.getAddress);


module.exports = router;