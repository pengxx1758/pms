var mysql = require('mysql');
var db = require('../conf/db');
var maintainSql = require('../sqlMapper/maintainSql');
var lockUtil = require('../util/lock');
var util = require('../util/util');

// 定义pool池
var pool = mysql.createPool(db.mysql);

module.exports = {
    // 获取系统所有维修列表
    querySysList: function(req,res,next){
        pool.getConnection((err,connection)=>{
            if(err){util.resDBconnectError();}
            let params = req.query;
            let resResult = {
                status: "0",
                msg: '查无结果',
                result: ''
            }
            connection.query(maintainSql.querySysList,[params.state,params.sId],(err,dbres)=>{
                if(err){util.resDBoperateError(err);}
                if(dbres.length !== 0){
                    resResult = {
                        status: "1",
                        msg: "查询成功",
                        result: dbres
                    }
                }
                util.responseJONS(res,resResult);
                connection.release();
            })
        })
    },
    // 获取住户所有的维修列表
    queryHouserList: function(req,res,next){
        pool.getConnection((err,connection)=>{
            if(err){util.resDBconnectError();}
            let params = req.query;
            let resResult = {
                status: "0",
                msg: '查无结果',
            }
            connection.query(maintainSql.queryHouserList,[params.state,params.huId],(err,dbres)=>{
                if(err){util.resDBoperateError(err);}
                if(dbres.length !== 0){
                    resResult = {
                        status: "1",
                        msg: "查询成功",
                        result: dbres
                    }
                }
                util.responseJONS(res,resResult);
                connection.release();
            })
        })
    },
    // 获取维修单详情
    queryDetailById: function(req,res,next){
        pool.getConnection((err,connection)=>{
            if(err){util.resDBconnectError();}
            let params = req.query;
            let resResult = {
                status: "0",
                msg: '查无结果',
            }
            connection.query(maintainSql.queryDetailById,[params.mId],(err,dbres)=>{
                if(err){util.resDBoperateError(err);}
                if(dbres.length !== 0){
                    resResult = {
                        status: "1",
                        msg: "查询成功",
                        result: dbres[0]
                    }
                }
                util.responseJONS(res,resResult);
                connection.release();
            })
        })
    },
    // 申请维修（基础信息）
    insertMaintain: function(req,res,next){
        pool.getConnection((err,connection)=>{
            if(err){util.resDBconnectError();}
            let params = req.body.data;
            let huId = req.body.huId;
            let sId = req.body.sId;
            let resResult = {
                status: "0",
                msg: '申请失败',
            }
            connection.query(maintainSql.insertMaintain,
                [params.mtype,params.mPerson,params.mPhone,params.mStartDate,params.mDesc,0,huId,sId,params.mAddress],
                (err,dbres)=>{
                if(err){util.resDBoperateError(err);}
                if(dbres.affectedRows !== 0){
                    resResult = {
                        status: "1",
                        msg: "申请成功",
                    }
                }
                util.responseJONS(res,resResult);
                connection.release();
            })
        })
    },
    // 为维修添加审核信息
    updateCheckInfo: function(req,res,next){
        pool.getConnection((err,connection)=>{
            if(err){util.resDBconnectError();}
            let params = req.body.data;
            let resResult = {
                status: "0",
                msg: '操作失败',
            }
            connection.query(maintainSql.updateCheckInfo,
                [params.mCharger,params.mOpinion,params.mMethod,params.mId],
                (err,dbres)=>{
                if(err){util.resDBoperateError(err);}
                if(dbres.length !== 0){
                    resResult = {
                        status: "1",
                        msg: "审核成功",
                        result: dbres
                    }
                }
                util.responseJONS(res,resResult);
                connection.release();
            })
        })
    },
    // 为维修添加验收信息
    updateAcceptInfo: function(req,res,next){
        pool.getConnection((err,connection)=>{
            if(err){util.resDBconnectError();}
            let params = req.body.data;
            let resResult = {
                status: "0",
                msg: '操作失败',
            }
            connection.query(maintainSql.updateAcceptInfo,
                [params.mEndDate,params.mMaintainer,params.mResult,params.mId],
                (err,dbres)=>{
                if(err){util.resDBoperateError(err);}
                if(dbres.length !== 0){
                    resResult = {
                        status: "1",
                        msg: "审核成功",
                    }
                }
                util.responseJONS(res,resResult);
                connection.release();
            })
        })
    },
    // 删除维修单
    delMaintian: function(req,res,next){
        pool.getConnection((err,connection)=>{
            if(err){util.resDBconnectError();}
            let params = req.body;
            let resResult = {
                status: "0",
                msg: '操作失败',
            }
            connection.query(maintainSql.delMaintian,[params.mId],(err,dbres)=>{
                if(err){util.resDBoperateError(err);}
                if(dbres.length !== 0){
                    resResult = {
                        status: "1",
                        msg: "撤销成功",
                    }
                }
                util.responseJONS(res,resResult);
                connection.release();
            })
        })
    },
    // 查询住户的小区住址
    queryAddress: function(req,res,next){
        pool.getConnection((err,connection)=>{
            if(err){util.resDBconnectError();}
            let params = req.query;
            let resResult = {
                status: "0",
                msg: '查无结果',
            }
            connection.query(maintainSql.queryAddress,[params.hId],(err,dbres)=>{
                if(err){util.resDBoperateError(err);}
                if(dbres.length !== 0){
                    resResult = {
                        status: "1",
                        msg: "查询成功",
                        result: dbres[0]
                    }
                }
                util.responseJONS(res,resResult);
                connection.release();
            })
        })
    }
}