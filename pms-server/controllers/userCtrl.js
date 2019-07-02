var userDao = require('../dao/userDao');
var lockUtil = require('../util/lock');
var util = require('../util/util');
var userCtrl = {
    // 用户注册
    add: function (req, res, next) {
        userDao.add(req, res, next);
    },

    // 用户登录
    login: function (req, res, next) {
        userDao.login(req,res,next);
    },

    // 修改密码
    changePwd: function (req, res, next) {
        userDao.changePwd(req,res,next);
        // 先获取盐值
        // userDao.queryByPhone(res, req, function (result) {
        //     var salt = result.u_salt;
        //     userDao.updatePwdByPhone(req, res, next, salt);
        // }, next)
    },

    // 检查手机是否已经被注册
    hasUserByPhone: function(req,res,next){
        userDao.hasUserByPhone(req,res,next);
    },

    getSystemInfo: function(req,res,next){
        userDao.querySysByuId(req,res,next);
    },

    getById: function(req,res,next){
        userDao.queryById(req,res,next);
    }



}

module.exports = userCtrl;

