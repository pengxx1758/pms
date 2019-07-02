var express = require('express');
var router = express.Router();
var complaintCtrl = require('../controllers/complaintCtrl')

router.post('/add',complaintCtrl.addComplaint);

// 住户列表
router.get('/getHouserList',complaintCtrl.getHouserList);
// 系统列表
router.get('/getSysList',complaintCtrl.getSysList);

router.get('/getDetailById',complaintCtrl.getDetailById);

router.post('/dealComplaint',complaintCtrl.dealComplaint);

router.post('/cancelComplaint',complaintCtrl.cancelComplaint);

module.exports = router;