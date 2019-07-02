var express = require('express');
var router = express.Router();
var positionCtrl = require('../controllers/positionCtrl')

router.get('/getStaff',positionCtrl.getAllStaff);

router.get('/hasPhone',positionCtrl.hasPhone);
// 添加自管理员账号
router.post('/addManager',positionCtrl.addManager);
// 添加职位信息
router.post('/addPos',positionCtrl.addPos);
// 子管理员权限
router.get('/getPermssion',positionCtrl.getPermssionById);
// 通过userId获取权限
router.get('/getPermssionByuId',positionCtrl.getPermssionByuserId);

router.post('/updatePermssion',positionCtrl.updatePermission);

router.get('/getById',positionCtrl.getById);

router.get('/getDetailById',positionCtrl.getDetailById);

router.post('/delPosition',positionCtrl.delById);




module.exports = router;