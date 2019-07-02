var mysql = require('mysql');
var db = require('../conf/db');
var systemSql = require('../sqlMapper/systemSql');
var lockUtil = require('../util/lock');
var util = require('../util/util');

// 定义pool池
var pool = mysql.createPool(db.mysql);

module.exports = {
    add: function (req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) { util.resDBconnectError(); }
            let params = req.body;
            let resResult = {
                status: '0',
                msg: '系统出错'
            }
            connection.query(systemSql.add, [params.endtime, params.communityNum], (err, dbres) => {
                if (err) { util.resDBoperateError(err); }
                if (dbres.affectedRows !== 0) {
                    console.log(dbres);
                    resResult = {
                        status: '1',
                        msg: '系统导入',
                        result: dbres
                    }
                }
                util.responseJONS(res, resResult);
                connection.release();
            })
        })
    },

    updateUser: function (req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) { util.resDBconnectError(); }
            let params = req.body;
            let resResult = {
                status: '0',
                msg: '交易失败'
            }
            console.log(params);
            connection.query(systemSql.updateUser, [params.sId, params.uId], (err, dbres) => {
                if (err) { util.resDBoperateError(err); }
                if (dbres.affectedRows !== 0) {
                    resResult = {
                        status: '1',
                        msg: '交易成功,请重新登录'
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
            let resResult = {
                status: '0',
            }
            console.log(params);
            connection.query(systemSql.queryById, [params.sId], (err, dbres) => {
                if (err) { util.resDBoperateError(err); }
                if (dbres.length !== 0) {
                    resResult = {
                        status: '1',
                        msg: '查询成功',
                        result: dbres[0]
                    }
                }
                util.responseJONS(res, resResult);
                connection.release();
            })
        })
    },

    updateSysInfo: function (req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) { util.resDBconnectError(); }
            let params = req.body;
            let resResult = {
                status: '0',
                msg: '操作失败'
            }
            console.log(params);
            connection.query(systemSql.updateSysInfo,[params.endDate, params.state, params.communityNum, params.sId], (err, dbres) => {
                if (err) { util.resDBoperateError(err); }
                if (dbres.affectedRows !== 0) {
                    resResult = {
                        status: '1',
                        msg: '系统订购成功,请重新登录'
                    }
                }
                util.responseJONS(res, resResult);
                connection.release();
            })
        })
    }



}