var mysql = require('mysql');
var db = require('../conf/db');
var complaintSql = require('../sqlMapper/complaintSql');
var lockUtil = require('../util/lock');
var util = require('../util/util');

// 定义pool池
var pool = mysql.createPool(db.mysql);

module.exports = {
    // 获取“待处理”的投诉信息
    querySysList: function (req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) { util.resDBconnectError(); }
            let params = req.query;
            let resResult = {
                status: "0",
                msg: '查无结果',
            }
            connection.query(complaintSql.querySysList, [params.state,params.sId], (err, dbres) => {
                if (err) { util.resDBoperateError(err); }
                if (dbres.length !== 0) {
                    resResult = {
                        status: "1",
                        msg: "查询成功",
                        result: dbres
                    }
                }
                util.responseJONS(res, resResult);
                connection.release();
            })
        })
    },
    // 获取住户个人的投诉信息
    queryHouserList: function (req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) { util.resDBconnectError(); }
            let params = req.query;
            let resResult = {
                status: "0",
                msg: '查无结果',
            }
            connection.query(complaintSql.queryHouserList, [params.state,params.huId], (err, dbres) => {
                if (err) { util.resDBoperateError(err); }
                if (dbres.length !== 0) {
                    resResult = {
                        status: "1",
                        msg: "查询成功",
                        result: dbres
                    }
                }
                util.responseJONS(res, resResult);
                connection.release();
            })
        })
    },

    // 获取投诉单详情
    queryDetailById: function (req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) { util.resDBconnectError(); }
            let params = req.query;
            let resResult = {
                status: "0",
                msg: '查无结果',
            }
            connection.query(complaintSql.queryDetailById, [params.cpId], (err, dbres) => {
                if (err) { util.resDBoperateError(err); }
                if (dbres.length !== 0) {
                    resResult = {
                        status: "1",
                        msg: "查询成功",
                        result: dbres[0]
                    }
                }
                util.responseJONS(res, resResult);
                connection.release();
            })
        })
    },
    // 投诉添加
    insertComplaint: function (req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) { util.resDBconnectError(); }
            let params = req.body.data;
            let huId = req.body.huId;
            let sId = req.body.sId;
            let resResult = {
                status: "0",
                msg: '申请失败',
            }
            connection.query(complaintSql.insertComplaint,
                [params.cpType, params.cpWay, params.cpPerson, params.cpPhone, params.cpContent, params.cpStartDate, 0, huId,sId,params.cpAddress],
                (err, dbres) => {
                    if (err) { util.resDBoperateError(err); }
                    if (dbres.affectedRows !== 0) {
                        resResult = {
                            status: "1",
                            msg: "申请成功",
                        }
                    }
                    util.responseJONS(res, resResult);
                    connection.release();
                })
        })
    },
    // 为投诉添加处理信息
    updateDealInfo: function (req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) { util.resDBconnectError(); }
            let params = req.body.data;
            let sId = req.body.sId;
            let resResult = {
                status: "0",
                msg: '操作失败',
            }
            connection.query(complaintSql.updateDealInfo,
                [params.cpCharger, params.cpEndDate, params.cpOpinion, params.cpDetail, params.cpId],
                (err, dbres) => {
                    if (err) { util.resDBoperateError(err); }
                    if (dbres.affectedRows !== 0) {
                        resResult = {
                            status: "1",
                            msg: "处理成功",
                        }
                    }
                    util.responseJONS(res, resResult);
                    connection.release();
                })
        })
    },
    // 删除投诉信息
    delComplaint: function (req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) { util.resDBconnectError(); }
            let params = req.body;
            let resResult = {
                status: "0",
                msg: '操作失败',
            }
            connection.query(complaintSql.delComplaint, [params.cpId], (err, dbres) => {
                if (err) { util.resDBoperateError(err); }
                if (dbres.length !== 0) {
                    resResult = {
                        status: "1",
                        msg: "删除成功",
                    }
                }
                util.responseJONS(res, resResult);
                connection.release();
            })
        })
    }
}