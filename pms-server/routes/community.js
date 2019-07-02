var express = require('express');
var router = express.Router();
var communityCtrl = require('../controllers/communityCtrl');

// 获取小区列表
router.get('/list',communityCtrl.communityList);

// 根据id获取小区信息
router.get('/detail',communityCtrl.queryById);

// 添加小区
router.post('/add',communityCtrl.add);

// 检查小区名称重复
router.get('/check',communityCtrl.check);

// 更新小区信息
router.post('/updateAll',communityCtrl.updateAll);

// 获取小区id和名称
router.get('/getIdandName',communityCtrl.getIdandName);

module.exports = router;
