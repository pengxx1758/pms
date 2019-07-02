var mysql = require('mysql');
var db = require('../conf/db');
var feeSql = require('../sqlMapper/feeSql');
var lockUtil = require('../util/lock');
var util = require('../util/util');

// 定义pool池
var pool = mysql.createPool(db.mysql);

module.exports = {
    
    insertFee: function(req,res,next){
        pool.getConnection((err,connection)=>{
            if(err){util.resDBconnectError();}
            let params = req.body.data;
            let sId = req.body.sId;
            let resResult={
                status: '0',
                msg: '添加失败'
            };
            connection.query(feeSql.insertFee,[sId,params.fOrderNum,params.fHouserId,
                params.fCreateDate,params.fEndDate,
                params.fDelayRate,params.state,params.fCharger],
                (err,dbres)=>{
                if(err){util.resDBoperateError(err);}
                if(dbres.affectedRows !== 0){
                    resResult={
                        status: '1',
                        msg: '添加成功',
                        result: dbres
                    }
                }
                util.responseJONS(res,resResult);
                connection.release();
            })
        })
    },

    insertFeeItem: function(req,res,next){
        pool.getConnection((err,connection)=>{
            if(err){util.resDBconnectError();}
            let params = req.body.data;
            let fId = req.body.fId;
            let resResult={
                status: '0',
                msg: '添加失败'
            };
            console.log(params);
            connection.query(feeSql.insertFeeItem,[fId,params.fsName,params.fsNum,params.fsMoney],
                (err,dbres)=>{
                if(err){util.resDBoperateError(err);}
                if(dbres.affectedRows !== 0){
                    resResult={
                        status: '1',
                        msg: '添加成功',
                        result: dbres
                    }
                }
                util.responseJONS(res,resResult);
                connection.release();
            })
        })
    },

    queryAllFeeItem: function (req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) { util.resDBconnectError(); }
            let params = req.query;
            let resResult = {
                status: '0',
                msg: '查无结果',
                result: ''
            };
            connection.query(feeSql.queryAllFeeItem, [params.fId], (err, dbres) => {
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

    queryAllSysFee: function (req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) { util.resDBconnectError(); }
            let params = req.query;
            let resResult = {
                status: '0',
                msg: '查无结果',
                result: ''
            };
            connection.query(feeSql.queryAllSysFee, [params.sId,params.state], (err, dbres) => {
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

    queryAllHouserFee: function (req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) { util.resDBconnectError(); }
            let params = req.query;
            let resResult = {
                status: '0',
                msg: '查无结果',
                result: ''
            };
            connection.query(feeSql.queryAllHouserFee, [params.sId,params.state], (err, dbres) => {
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

    delFeeItem: function(req,res,next){
        pool.getConnection((err,connection)=>{
            if(err){util.resDBconnectError();}
            let params = req.body;
            let resResult = {
                status: '0',
                msg: '删除失败'
            }
            connection.query(feeSql.delFeeItem,[params.fiId],(err,dbres)=>{
                if(err){util.resDBoperateError(err);}
                if(dbres.affectedRows !== 0){
                    resResult ={
                        status: '1',
                        msg: '删除成功',
                    }
                }
                util.responseJONS(res,resResult);
                connection.release();
            })
        })
    },

    updateFee: function (req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) { util.resDBconnectError(); }
            let params = req.body;
            let resResult = {
                status: '0',
                msg: '操作失败',
            };
            connection.query(feeSql.updateFee,[params.totalMoney,params.state,params.fId], 
                (err, dbres) => {
                if (err) { util.resDBoperateError(err); }
                if (dbres.affectedRows !== 0) {
                    resResult = {
                        status: '1',
                        msg: '订单生成成功',
                        result: ''
                    }
                }
                util.responseJONS(res, resResult);
                connection.release();
            })
        })
    },

    updateFeeState: function (req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) { util.resDBconnectError(); }
            let params = req.body;
            let resResult = {
                status: '0',
                msg: '操作失败',
            };
            connection.query(feeSql.updateFeeState,[params.state,params.fId], 
                (err, dbres) => {
                if (err) { util.resDBoperateError(err); }
                if (dbres.affectedRows !== 0) {
                    resResult = {
                        status: '1',
                        msg: '操作成功',
                        result: ''
                    }
                }
                util.responseJONS(res, resResult);
                connection.release();
            })
        })
    },

}