var mysql = require('mysql');
var db = require('../conf/db');
var staffSql = require('../sqlMapper/staffSql');
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
            connection.query(staffSql.add,[params.sCommunity,params.sName,params.sPhone,
                params.sWechat,params.sEmail,params.sRemarks],
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

    queryById: function(req,res,next){
        pool.getConnection((err,connection)=>{
            if(err){util.resDBconnectError();}
            let params = req.query;
            let resResult = {
                status: '0',
                msg: '查无结果'
            }
            console.log(params);
            connection.query(staffSql.queryById,[params.sId],(err,dbres)=>{
                if(err){util.resDBoperateError(err);}
                if(dbres.length !== 0){
                    resResult ={
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

    queryAll: function (req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) { util.resDBconnectError(); }
            let params = req.query;
            let resResult = {
                status: '0',
                msg: '查无结果',
                result: ''
            };
            connection.query(staffSql.queryAll, [params.sId], (err, dbres) => {
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

    updateAll: function (req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) { util.resDBconnectError(); }
            let params = req.body.data;
            let resResult = {
                status: '0',
                msg: '修改失败',
                result: ''
            };
            connection.query(staffSql.updateAll,[params.sCommunity,params.sName,params.sPhone,
                params.sWechat,params.sEmail,params.sRemarks,params.sId], 
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

    delById: function(req,res,next){
        pool.getConnection((err,connection)=>{
            if(err){util.resDBconnectError();}
            let params = req.body;
            let resResult = {
                status: '0',
                msg: '删除失败'
            }
            connection.query(staffSql.delById,[params.sId],(err,dbres)=>{
                if(err){util.resDBoperateError(err);}
                if(dbres.affectedRows !== 0){
                    resResult ={
                        status: '1',
                        msg: '删除成功',
                        result: ''
                    }
                }
                util.responseJONS(res,resResult);
                connection.release();
            })
        })
    }
}