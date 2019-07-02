const Core = require('@alicloud/pop-core');
const aliAK = require('../conf/aliak');
var util = require('../util/util');

var client = new Core({
    accessKeyId: aliAK.accessKeyId,
    accessKeySecret: aliAK.accessKeySecret,
    endpoint: 'https://dysmsapi.aliyuncs.com',
    apiVersion: '2017-05-25'
});
// var params = {
//     "RegionId": "cn-hangzhou",
//     "PhoneNumbers": _params.telphone,
//     "SignName": "PXX物业管理系统",
//     "TemplateCode": "SMS_163848055",
//     "TemplateParam": "{\"code\":"+code+"}"
// };
var requestOption = {
    method: 'POST'
};

var sendSms = {
    getCheckCode: function (res, _params) {
        var resCode = getRandom();
        let resResult = {
            status: '0',
            msg: '发送失败'
        }
        client.request('SendSms', {
            "RegionId": "cn-hangzhou",
            "PhoneNumbers": _params.phone,
            "SignName": "PXX物业管理系统",
            "TemplateCode": "SMS_163848055",
            "TemplateParam": "{\"code\":" + resCode + "}"
        }, requestOption).then((dbres) => {
            if (dbres.Code == "OK") {
                resResult = {
                    status: '1',
                    msg: '发送成功',
                    recPhone: _params.phone,   // 接收验证码的手机
                    checkCode: resCode,   // 手机接收到的验证码

                    // 接收到的时间 待定=====================
                    recTime: new Date().getTime()
                }
            }
            /* 返回json */
            util.responseJONS(res, resResult)
        }, (ex) => {
            console.log(ex);
        })
    }
}

function getRandom() {
    var code = ""
    for (let i = 0; i < 4; i++) {
        code += Math.floor(1 + Math.random() * 9);
    }
    return code;
}



module.exports = sendSms;