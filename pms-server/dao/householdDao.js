var mysql = require('mysql');
var db = require('../conf/db');
var householdSql = require('../sqlMapper/householdSql');
var lockUtil = require('../util/lock');
var util = require('../util/util');

// 定义pool池
var pool = mysql.createPool(db.mysql);

module.exports = {


    add: function (req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) { util.resDBconnectError(); }
            let params = req.body.data;
            let resResult = {
                status: '0',
                msg: '添加失败'
            };
            connection.query(householdSql.add,
                [params.hState, params.buildingId, params.hDoorplate, params.hName, params.hGender, params.hPhone, params.hIdentity,
                params.hIdCard, params.hBirth, params.hCard, params.hWorking, params.hRoomTime, params.hRoomReason,
                params.hQQ, params.hWechat, params.hEmail, params.hHousePhone,
                params.hEmergencyPerson, params.hEmergencyPhone],
                (err, dbres) => {
                    if (err) { util.resDBoperateError(err); }
                    if (dbres.affectedRows !== 0) {
                        resResult = {
                            status: '1',
                            msg: '添加成功',
                            result: dbres
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
            connection.query(householdSql.queryAll, [params.sId, params.hState], (err, dbres) => {
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
            connection.query(householdSql.queryById, [params.hId], (err, dbres) => {
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
                msg: '修改失败'
            };
            connection.query(householdSql.updateAll, [params.buildingId, params.hDoorplate, params.hName, params.hGender, params.hPhone, params.hIdentity,
            params.hIdCard, params.hBirth, params.hCard, params.hWorking, params.hRoomTime, params.hRoomReason,
            params.hQQ, params.hWechat, params.hEmail, params.hHousePhone,
            params.hEmergencyPerson, params.hEmergencyPhone, params.hId],
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

    queryAllCB: function (req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) { util.resDBconnectError(); }
            let resResult = {
                status: '0',
                result: ''
            };
            connection.query(householdSql.queryAllCB, [], (err, dbres) => {
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

    queryHousePhoneRepeat: function (req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) { util.resDBconnectError(); }
            let params = req.query;
            let resResult = {
                status: '0',
            }
            connection.query(householdSql.checkPhoneRepeat, [params.phone], (err, dbres) => {
                if (err) { util.resDBoperateError(err); }
                if (dbres[0].result !== 0) {
                    resResult = {
                        status: '1',
                        msg: '抱歉,此手机已被注册成为住户',
                        result: ''
                    }
                }
                util.responseJONS(res, resResult);
                connection.release();
            })
        })
    },

    addUser: function (req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) { util.resDBconnectError(); }
            let params = req.body;
            let resResult = {
                status: '0',
                msg: '添加失败'
            }
            let salt = lockUtil.getRandomSalt();
            let unlockPwd = lockUtil.saltPassFunc('000000', salt);
            connection.query(householdSql.addUser, [params.huId, params.phone, unlockPwd, salt, params.cId, params.state], (err, dbres) => {
                if (err) { util.resDBoperateError(err); }
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

    queryUncheckList: function (req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) { util.resDBconnectError(); }
            let params = req.query;
            let resResult = {
                status: '0',
                msg: '查无结果',
                result: ''
            };
            connection.query(householdSql.queryUncheckList, [params.sId], (err, dbres) => {
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
    queryUncheckList: function (req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) { util.resDBconnectError(); }
            let params = req.query;
            let resResult = {
                status: '0',
                msg: '查无结果',
                result: ''
            };
            connection.query(householdSql.queryUncheckList, [params.sId], (err, dbres) => {
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

    login: function (req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) { util.resDBconnectError(); }
            let params = req.body.data;
            let resResult = {
                status: '0',
                msg: '账号或密码错误',
                result: ''
            };
            connection.query(householdSql.login, [params.userName], (err, dbres) => {
                if (err) { util.resDBoperateError(err); }
                if (dbres.length !== 0) {
                    let userInfo = dbres[0];
                    let unlockPwd = lockUtil.saltPassFunc(params.password, userInfo.hu_salt);
                    if (userInfo.hu_password == unlockPwd) {
                        resResult = {
                            status: '1',
                            msg: '登录成功',
                            result: userInfo
                        }
                    }
                }
                util.responseJONS(res, resResult);
                connection.release();
            })
        })
    },

    updateStateById: function (req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) { util.resDBconnectError(); }
            let params = req.body;
            let resResult = {
                status: '0',
                msg: '审核失败'
            };
            connection.query(householdSql.updateStateById, [params.hId, params.hId],
                (err, dbres) => {
                    if (err) { util.resDBoperateError(err); }
                    if (dbres.affectedRows !== 0) {
                        resResult = {
                            status: '1',
                            msg: '审核通过',
                            result: ''
                        }
                    }
                    util.responseJONS(res, resResult);
                    connection.release();
                })
        })
    },

    queryAllbybId: function (req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) { util.resDBconnectError(); }
            let params = req.query;
            let resResult = {
                status: '0',
                msg: '查无数据',
                result: ''
            };
            connection.query(householdSql.queryAllBybId, [params.bId], (err, dbres) => {
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
    }



}