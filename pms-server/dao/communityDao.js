var mysql = require('mysql');
var db = require('../conf/db');
var communitySql = require('../sqlMapper/communitySql');
// var lockUtil = require('../util/lock');
var util = require('../util/util');
// 定义pool池
var pool = mysql.createPool(db.mysql);
module.exports = {
    // 添加小区
    add: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            if (err) { util.resDBconnectError(); }
            let params = req.body.data;
            let sId = req.body.systemId;
            let resResult = {
                status: '0',
                msg: '添加失败'
            }
            console.log(params);
            console.log(sId);
            connection.query(communitySql.add,
                [sId, params.cName, params.cRegion.join(), params.cPlace, params.cCharger, params.cPhone,
                    params.cArea, params.cBuildingArea, params.cPublicArea, params.cGreening, params.cGarageArea, params.cRemarks],
                function (err, dbres) {
                    if (err) { util.resDBoperateError(err); }
                    console.log(dbres);
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

    communityList: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            if (err) {util.resDBconnectError();}
            let params = req.query;
            let resResult = {
                status: '0',
                msg: '查无结果',
                result: ''
            };
            connection.query(communitySql.queryAll, [params.sId], function (err, dbres) {
                if (err) {util.resDBoperateError(err);}
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
        pool.getConnection(function (err, connection) {
            if (err) {util.resDBconnectError();}
            let params = req.query;
            let resResult = {
                status: '0',
                msg: '查询无结果',
                result: ''
            };
            connection.query(communitySql.queryById, [params.cId], function (err, dbres) {
                if (err) {util.resDBoperateError(err);}
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

    checkRepeat: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            if (err) {util.resDBconnectError();}
            let cName = req.query.cName;
            let sId = req.query.systemId;
            let resResult = {
                status: '0',
                msg: '',
                result: ''
            };
            connection.query(communitySql.checkRepeat, [sId, cName], function (err, dbres) {
                if (err) {util.resDBoperateError(err);}
                if (dbres[0].result !== 0) {
                    resResult = {
                        status: '1',
                        msg: '已存在该小区',
                        result: ''
                    }
                }
                util.responseJONS(res, resResult);
                connection.release();
            })
        })
    },

    updateAll: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            if (err) { util.resDBconnectError(); }
            let params = req.body.data;
            let resResult = {
                status: '0',
                msg: '保存失败'
            }
            connection.query(communitySql.update, [params.cName, params.cRegion.join(), params.cPlace, params.cCharger, params.cPhone,
            params.cArea, params.cBuildingArea, params.cPublicArea, params.cGreening, params.cGarageArea, params.cRemarks, params.cId],
                function (err, dbres) {
                    if (err) {util.resDBoperateError(err);}
                    if (dbres) {
                        resResult = {
                            status: '1',
                            msg: '保存成功',
                            result: ''
                        }
                    }
                    util.responseJONS(res, resResult);
                    connection.release();
                })
        })
    },

    queryIdandName: function (req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) { util.resDBconnectError(); }
            let params = req.query;
            let resResult = {
                status: '0',
                msg: '查无结果',
                result: ''
            };
            connection.query(communitySql.queryIdandName, [params.sId], (err, dbres) => {
                if (err) { util.resDBoperateError(err); }
                if (dbres.length) {
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
