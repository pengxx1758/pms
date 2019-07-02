var mysql = require('mysql');
var db = require('../conf/db');
var feeSubSql = require('../sqlMapper/feeSubSql');
var lockUtil = require('../util/lock');
var util = require('../util/util');

// 定义pool池
var pool = mysql.createPool(db.mysql);

module.exports = {
    insertFeeSub: function(req,res,next){
        pool.getConnection((err,connection)=>{
            if(err){util.resDBconnectError();}
            let params = req.body.data;
            let sId = req.body.sId;
            let resResult={
                status: '0',
                msg: '添加失败'
            };
            console.log(params);
            connection.query(feeSubSql.insert,
                [sId,params.fsName,params.fsType,params.fsPrice],
                (err,dbres)=>{
                if(err){util.resDBoperateError(err);}
                if(dbres.affectedRows !== 0){
                    resResult={
                        status: '1',
                        msg: '添加成功',
                    }
                }
                util.responseJONS(res,resResult);
                connection.release();
            })
        })
    },

    queryAll: function (req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) { util.resDBconnectError(); }
            let params = req.query;
            let resResult = {
                status: '0',
                msg: '查无结果',
                result: ''
            };
            connection.query(feeSubSql.queryAll, [params.sId], (err, dbres) => {
                if (err) { util.resDBoperateError(err); }
                if (dbres.length !== 0) {
                    resResult = {
                        status: '1',
                        msg: '查询成功',
                        result: dbres
                    }
                }
                util.responseJONS(res, resResult);
                connection.release();
            })
        })
    },

    delById: function(req,res,next){
        pool.getConnection((err,connection)=>{
            if(err){util.resDBconnectError();}
            let params = req.body;
            let resResult = {
                status: "0",
                msg: '操作失败',
            }
            connection.query(feeSubSql.delById,[params.fsId],(err,dbres)=>{
                if(err){util.resDBoperateError(err);}
                if(dbres.affectedRows !== 0){
                    resResult = {
                        status: "1",
                        msg: "删除成功",
                    }
                }
                util.responseJONS(res,resResult);
                connection.release();
            })
        })
    },

    queryAllbyType: function (req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) { util.resDBconnectError(); }
            let params = req.query;
            let resResult = {
                status: '0',
                msg: '查无结果',
                result: ''
            };
            connection.query(feeSubSql.queryAllbyType, [params.fsType,params.sId], (err, dbres) => {
                if (err) { util.resDBoperateError(err); }
                if (dbres.length !== 0) {
                    resResult = {
                        status: '1',
                        msg: '查询成功',
                        result: dbres
                    }
                }
                util.responseJONS(res, resResult);
                connection.release();
            })
        })
    },

    


}