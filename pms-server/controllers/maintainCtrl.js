var maintainDao = require('../dao/maintainDao');
var lockUtil = require('../util/lock');
var util = require('../util/util');
module.exports = {
    addMaintain: function(req,res,next){
        maintainDao.insertMaintain(req,res,next);
    },

    getHouserList: function(req,res,next){
        maintainDao.queryHouserList(req,res,next);
    },

    getSysList: function(req,res,next){
        maintainDao.querySysList(req,res,next);
    },

    getDetailById: function(req,res,next){
        maintainDao.queryDetailById(req,res,next);
    },

    checkMaintain: function(req,res,next){
        maintainDao.updateCheckInfo(req,res,next);
    },

    acceptMiantain: function(req,res,next){
        maintainDao.updateAcceptInfo(req,res,next);
    },

    cancelMaintain: function(req,res,next){
        maintainDao.delMaintian(req,res,next);
    },
    getAddress: function(req,res,next){
        maintainDao.queryAddress(req,res,next);
    }
}