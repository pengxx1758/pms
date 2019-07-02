var mysql = require('mysql');
var db = require('../conf/db');
var positionSql = require('../sqlMapper/positionSql');
var lockUtil = require('../util/lock');
var util = require('../util/util');

// 定义pool池
var pool = mysql.createPool(db.mysql);

module.exports = {
    queryAllStaffBycId: function (req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) { util.resDBconnectError(); }
            let params = req.query;
            let resResult = {
                status: '0',
                msg: '查无结果',
            };
            connection.query(positionSql.queryAllStaffBycId, [params.cId], (err, dbres) => {
                if (err) { util.resDBoperateError(err); }
                if (dbres.length !== 0) {
                    resResult = {
                        status: '1',
                        msg: '查询成功',
                        result: dbres
                    }
                    util.responseJONS(res, resResult);
                    connection.release();
                }
            })
        })
    },

    checkPhoneRepeat: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            if (err) { util.resDBconnectError(); }
            let params = req.query;
            let resResult = {
                status: '0'
            }
            connection.query(positionSql.checkPhoneRepeat, [params.phone, params.sId], function (err, dbres) {
                if (err) { util.resDBoperateError(err); }
                if (dbres[0].result > 0) {
                    resResult = {
                        status: '1',
                        msg: '该手机号已被注册',
                        result: ''
                    }
                }
                util.responseJONS(res, resResult);
                connection.release();
            })
        })

    },

    addManager: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            if (err) { util.resDBconnectError(); }
            let params = req.body.data;
            let resResult = {
                status: '0',
                msg: '操作失败'
            }
            let salt = lockUtil.getRandomSalt();
            let pwd = lockUtil.saltPassFunc(params.posPwd, salt);
            connection.query(
                positionSql.addUser,
                [params.sPhone, pwd, salt, 1, 0, params.systemId],
                function (err, dbres) {
                    if (err) { util.resDBoperateError(err); }
                    if (dbres.affectedRows !== 0) {
                        resResult = {
                            status: '1',
                            msg: '插入成功',
                            result: dbres
                        }
                    }
                    util.responseJONS(res, resResult);
                    // 释放连接
                    connection.release();
                })

        })
    },

    insertPos: function (req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) { util.resDBconnectError(); }
            let params = req.body.data;
            let uId = req.body.uId;
            let resResult = {
                status: '0',
                msg: '添加失败'
            };
            connection.query(positionSql.insertPos,
                [params.systemId, params.communityId, params.posName, params.sId, uId],
                (err, dbres) => {
                    if (err) { util.resDBoperateError(err); }
                    if (dbres.affectedRows !== 0) {
                        resResult = {
                            status: '1',
                            msg: '添加成功',
                        }
                    }
                    util.responseJONS(res, resResult);
                    connection.release();
                })
        })
    },

    queryPremissionById: function (req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) { util.resDBconnectError(); }
            let params = req.query;
            let resResult = {
                status: '0',
                msg: '查无结果'
            }
            connection.query(positionSql.queryPermissionById, [params.posId], (err, dbres) => {
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

    queryPremissionByuserId: function (req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) { util.resDBconnectError(); }
            let params = req.query;
            let resResult = {
                status: '0',
                msg: '查无结果'
            }
            connection.query(positionSql.queryPermissionByuserId, [params.uId], (err, dbres) => {
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

    updatePermission: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            if (err) { util.resDBconnectError(); }
            let params = req.body.data;
            let posId = req.body.posId;
            let resResult = {
                status: '0',
                msg: '保存失败'
            }
            connection.query(positionSql.updatePermission, [params.login,
            params.community, params.building, params.household, params.park,
            params.feePay, params.feeSub, params.feeTip,
            params.staff, params.position,
            params.maintain, params.complaint,
                posId],
                function (err, dbres) {
                    if (err) { util.resDBoperateError(err); }
                    if (dbres) {
                        resResult = {
                            status: '1',
                            msg: '保存成功',
                        }
                    }
                    util.responseJONS(res, resResult);
                    connection.release();
                })
        })
    },

    queryAllPos: function (req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) { util.resDBconnectError(); }
            let params = req.query;
            let resResult = {
                status: '0',
                msg: '查无结果',
                result: ''
            };
            connection.query(positionSql.queryAllPosById, [params.sId], (err, dbres) => {
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

    queryDetailById: function (req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) { util.resDBconnectError(); }
            let params = req.query;
            let resResult = {
                status: '0',
                msg: '查询失败'
            }
            connection.query(positionSql.queryDetailById, [params.posId], (err, dbres) => {
                if (err) { util.resDBoperateError(err); }
                let pwd = lockUtil.saltPassFunc(dbres[0].u_password,dbres[0].u_salt);
                dbres[0].u_password = pwd;
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

    delById: function(req,res,next){
        pool.getConnection((err,connection)=>{
            if(err){util.resDBconnectError();}
            let params = req.body;
            let resResult = {
                status: '0',
                msg: '删除失败'
            }
            connection.query(positionSql.delPosiiton,[params.posId],(err,dbres)=>{
                if(err){util.resDBoperateError(err);}
            })
            connection.query(positionSql.delUser,[params.uId],(err,dbres)=>{
                if(err){util.resDBoperateError(err);}
                console.log(dbres);
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
    }


}