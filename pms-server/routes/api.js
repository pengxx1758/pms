var express = require('express');
var router = express.Router();
var sendSms = require('../util/sendSms')

/* 手机验证码接口 */
router.post('/sendSms', function (req, res, next) {
    var _params = req.body || req.param;
    console.log(_params);
    sendSms.getCheckCode(res,_params);
})

/* 支付接口 */




module.exports = router;