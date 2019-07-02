var util = {
    /**
     * 向客户端返回json数据
     * @param response
     * @param result
     */
    responseJONS : function (response,result) {
        if(typeof result === 'undefined'){
            response.json({
                code : '-200',
                msg : '操作失败！'
            })
        }else{
            response.json(result);
        }
    },
    formatDate : function (dateObj) {
        var date = new Date(dateObj);
        var d = date.toLocaleDateString();
        var t = date.toLocaleTimeString();
        return d + " " + t;
    },
    resDBconnectError: function(){
        // let result = {
        //     code: '-1',
        //     msg: '数据连接失败'
        // }
        // console.log(err);
        console.log('数据库连接失败');
    },
    resDBoperateError: function(err){
        // this.responseJONS(res,{
        //     status: '-1',
        //     msg: '操作出错',
        //     result: ''
        // })
        console.log("数据库语句执行出错");
        // throw new Error(err);
        console.log(err);
    }

    
}
module.exports = util;