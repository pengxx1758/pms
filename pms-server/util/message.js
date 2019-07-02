// var request = require('request');
// var messageConf = require('../conf/messageConf')
// var lockApi = require('../util/lock');
// const timestamp = new Date().getTime();
// var opt = {
//     url: "https://api.miaodiyun.com/20150822/industrySMS/sendSMS",
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     form: {
//         accountSid: messageConf.accountSid,
//         templateid: messageConf.templateid,
//         to: '13553381758',
//         timestamp: timestamp,
//         sig: lockApi.md5(messageConf.accountSid+messageConf.userToken+timestamp),
//         param: 1
//     }
// }

// request.post(opt,function(err,res,body){
//     console.log(opt);
//     console.log('===========');
//     if(err){
//         throw new Error(err);
//     }
//     // console.log(res);
//     console.log('==============');
//     console.log(body);
// })
