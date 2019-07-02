var mysql = require('mysql');
var db = require('../conf/db');
var userSql = require('../sqlMapper/userSql');
var lockUtil = require('../util/lock');
var util = require('../util/util');

// 定义pool池
var pool = mysql.createPool(db.mysql);

module.exports = {
    
    add: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            if (err) {util.resDBconnectError();}
            let params = req.body.data;
            let resResult ={
                status: '0',
                msg: '注册失败'
            }
            let salt = lockUtil.getRandomSalt();
            let pwd = lockUtil.saltPassFunc(params.password, salt);
            console.log(params);
            connection.query(
                userSql.insert,
                [params.userName, pwd, salt, params.userRole],
                function (err, dbres) {
                    if (err) {util.resDBoperateError(err);}
                    if (dbres.affectedRows !== 0) {
                        resResult = {
                            status: '1',
                            msg: '注册成功',
                            result: ''
                        }
                    }
                    util.responseJONS(res, resResult);
                    // 释放连接
                    connection.release();
                })

        })
    },

    login: function(req,res,next){
        pool.getConnection((err,connection)=>{
            if(err){util.resDBconnectError();}
            let params = req.body.data;
            let resResult = {
                status: '0',
                msg: '账号或密码错误',
                result: ''
            };
            connection.query(userSql.queryByPhone,[params.userName],(err,dbres)=>{
                if(err){util.resDBoperateError(err);}
                if(dbres.length !== 0){
                    let userInfo = dbres[0];
                    let unlockPwd = lockUtil.saltPassFunc(params.password, userInfo.u_salt);
                    if(userInfo.u_password == unlockPwd){
                        resResult = {
                            status: '1',
                            msg: '登录成功',
                            result: userInfo
                        }
                    }
                }
                util.responseJONS(res,resResult);
                connection.release();
            })
        })
    },

    updatePwdByPhone: function (req, res, next, salt) {
        var params = req.body || req.params;
        var newPwd = lockUtil.saltPassFunc(params.password, salt);
        pool.getConnection(function (err, connection) {
            if (err) {
                throw new Error(err);
            }
            connection.query(userSql.updatePwdByPhone, [newPwd, params.phone], function (err, result) {
                if (err) {
                    throw new Error(err);
                }
                if (result) {
                    result = {
                        status: '0',
                        msg: '密码修改成功',
                        result: ''
                    }
                    util.responseJONS(res, result);
                }
                connection.release();
            })
        })
    },

    hasUserByPhone: function(req,res,next){
        pool.getConnection(function(err,connection){
            if(err){util.resDBconnectError();}
            let params = req.query;
            let resResult={
                status: '0'
            }
            connection.query(userSql.hasUserByPhone,[params.phone],function(err,dbres){
                if(err){util.resDBoperateError(err);}   
                if(dbres[0].result > 0){
                    resResult = {
                        status: '1',
                        msg: '手机号已被注册',
                        result: ''
                    }
                }
                util.responseJONS(res,resResult);
                connection.release();
            })
        })

    },

    querySysByuId: function(req,res,next){
        pool.getConnection((err,connection)=>{
            if(err){util.resDBconnectError();}
            let params = req.query;
            let resResult = {
                status: '0',
                msg: '',
                result: ''
            }
            connection.query(userSql.querySysByuId,[params.uId],(err,dbres)=>{
                if(err){util.resDBoperateError(err);}
                if(dbres.length !== 0){
                    resResult = {
                        status: '1',
                        msg: '查询成功',
                        result: dbres[0]
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
                msg: '查询失败',
            }
            connection.query(userSql.queryById,[params.uId],(err,dbres)=>{
                if(err){util.resDBoperateError(err);}
                if(dbres.length !== 0){
                    resResult = {
                        status: '1',
                        msg: '查询成功',
                        result: dbres[0]
                    }
                }
                util.responseJONS(res,resResult);
                connection.release();
            })
        })
    },

    changePwd: function(req,res,next){
        pool.getConnection((err,connection)=>{
            if(err){util.resDBconnectError();}
            let params = req.body;
            let salt;
            let resResult = {
                status: '0',
                msg: '修改失败',
            }
            connection.query(userSql.queryByPhone,[params.phone],(err,dbres)=>{
                if(err){util.resDBoperateError(err);}
                if(dbres.length !== 0){
                    // 有用户信息
                    salt = dbres[0].u_salt;
                }
            });
            let pwd = lockUtil.saltPassFunc(params.password,salt);
            connection.query(userSql.updatePwd,[pwd,params.phone],(err,dbres)=>{
                if(err){util.resDBoperateError(err);}
                if(dbres.affectedRows !== 0){
                    resResult = {
                        status: '1',
                        msg: '修改成功'
                    }
                }
            });

            util.responseJONS(res,resResult);
            connection.release();
        })
    }
}
