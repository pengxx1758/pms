var mysql = require('mysql');
var db = require('../conf/db');
var parkSql = require('../sqlMapper/parkSql');
var lockUtil = require('../util/lock');
var util = require('../util/util');

// 定义pool池
var pool = mysql.createPool(db.mysql);

module.exports = {
    add: function(req,res,next){
        pool.getConnection((err,connection)=>{
            if(err){util.resDBconnectError();}
            let params = req.body.data;
            let resResult={
                status: '0',
                msg: '添加失败'
            };
            connection.query(parkSql.add,[params.pCommunity,params.pNumber,params.pArea,
                params.pStyle,params.pStatus,params.pBuyer,params.pCarNumber,params.pBuyerPhone,params.pRemarks],
                (err,dbres)=>{
                if(err){util.resDBoperateError(err);}
                if(dbres.affectedRows !== 0){
                    resResult={
                        status: '1',
                        msg: '添加成功',
                        result: ''
                    }
                }
                util.responseJONS(res,resResult);
                connection.release();
            })
        })
    },

    querypNumberRepeat: function(req,res,next){
        pool.getConnection((err,connection)=>{
            if(err){util.resDBconnectError();}
            let params = req.query;
            let resResult = {
                status: '0',
            }
            connection.query(parkSql.querypNumberRepeat,[params.cId,params.pNumber],(err,dbres)=>{
                if(err){util.resDBoperateError(err);}
                if(dbres[0].result !== 0){
                    resResult ={
                        status: '1',
                        msg: '该小区已存在此车位号',
                        result: ''
                    }
                }
                util.responseJONS(res,resResult);
                connection.release();
            })
        })
    },

    queryById: function(req,res,next){
        pool.getConnection((err,connection)=>{
            if(err){util.resDBconnectError();}
            let params = req.query;
            let resResult = {
                status: '0',
            }
            connection.query(parkSql.queryById,[params.pId],(err,dbres)=>{
                if(err){util.resDBoperateError(err);}
                if(dbres.length !== 0){
                    resResult ={
                        status: '1',
                        msg: '查询成功',
                        result: dbres
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
            connection.query(parkSql.queryAll, [params.sId], (err, dbres) => {
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

    updateAll: function (req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) { util.resDBconnectError(); }
            let params = req.body.data;
            let resResult = {
                status: '0',
                msg: '修改失败',
                result: ''
            };
            connection.query(parkSql.updateAll,[params.pCommunity,params.pNumber,params.pArea,
                params.pStyle,params.pStatus,params.pBuyer,params.pCarNumber,params.pBuyerPhone,params.pRemaeks,params.pId], 
                (err, dbres) => {
                if (err) { util.resDBoperateError(err); }
                if (dbres.affectedRows !== 0) {
                    resResult = {
                        status: '1',
                        msg: '修改成功',
                        result: ''
                    }
                }
                util.responseJONS(res, resResult);
                connection.release();
            })
        })
    },


}