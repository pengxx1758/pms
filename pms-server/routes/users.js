var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/userCtrl');


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// 注册（超级管理员）
router.post('/registerSubmit',userCtrl.add);
// 登录
router.post('/login',userCtrl.login);
// 修改密码
router.post('/changePwd',userCtrl.changePwd);
// 检查手机是否存在
router.get('/check',userCtrl.hasUserByPhone);
// 检查统一系统是否存在同一手机
router.get('/getSystemInfo',userCtrl.getSystemInfo);
// 获取用户信息
router.get('/getById',userCtrl.getById);
module.exports = router; 
