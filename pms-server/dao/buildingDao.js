var mysql = require('mysql');
var db = require('../conf/db');
var buildingSql = require('../sqlMapper/buildingSql');
var lockUtil = require('../util/lock');
var util = require('../util/util');

// 定义pool池
var pool = mysql.createPool(db.mysql);

module.exports = {
    add: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            if (err) {util.resDBconnectError();}
            let params = req.body.data;
            let resResult = {
                status: '0',
                msg: '添加失败',
            };
            connection.query(buildingSql.add,
                [params.bCommunity, params.bName, params.bUnitNum, params.bLayerNum, params.bHouseNum,
                params.bStyle, params.bDescription, params.bRemarks], function (err, dbres) {
                    if (err) {util.resDBoperateError(err);}
                    if (dbres.affectedRows !== 0) {
                        resResult = {
                            status: '1',
                            msg: '添加成功',
                            result: ''
                        }
                    }
                    util.responseJONS(res, resResult);
                    connection.release();
                })
        })
    },

    checkNameRepeat: function (req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) { util.resDBconnectError(); }
            let params = req.query;
            let resResult = { status: '0' }
            connection.query(buildingSql.checkNameRepeat, [params.bcId, params.bName], (err, dbres) => {
                if (err) { util.resDBoperateError(err); }
                if (dbres[0].result !== 0) {
                    resResult = {
                        status: '1',
                        msg: '该小区楼盘已存在',
                        result: ''
                    }
                }
                util.responseJONS(res, resResult);
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
            connection.query(buildingSql.queryAll, [params.sId], (err, dbres) => {
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

    queryById: function (req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) { util.resDBconnectError(); }
            let params = req.query;
            let resResult = { status: '0' };
            connection.query(buildingSql.querybyId, [params.bId], (err, dbres) => {
                if (err) { util.resDBoperateError(err); }
                if (dbres.length !== 0) {
                    resResult = {
                        status: '1',
                        msg: '查询成功',
                        result: dbres[0]
                    }
                }
                util.responseJONS(res, dbres);
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
            connection.query(buildingSql.updateAll,
                [params.bName, params.bUnitNum, params.bLayerNum, params.bHouseNum,
                params.bStyle, params.bDescription, params.bRemarks, params.bId],
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

    queryCnameAndBname: function (req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) { util.resDBconnectError(); }
            let params = req.query;
            let resResult = { status: '0' };
            connection.query(buildingSql.queryCnameAndBname, [params.sId], (err, dbres) => {
                if (err) { util.resDBoperateError(err); }
                if (dbres.length !== 0) {
                    resResult = {
                        status: '1',
                        msg: '查询成功',
                        result: dbres
                    };
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
            connection.query(buildingSql.delById,[params.bId],(err,dbres)=>{
                if(err){util.resDBoperateError(err);}
                if(dbres.length !== 0){
                    resResult = {
                        status: "1",
                        msg: "删除成功",
                    }
                }
                util.responseJONS(res,resResult);
                connection.release();
            })
        })
    }

}