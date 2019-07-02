var complaintDao = require('../dao/complaintDao');
var lockUtil = require('../util/lock');
var util = require('../util/util');
module.exports = {
    addComplaint: function(req,res,next){
        complaintDao.insertComplaint(req,res,next);
    },

    getHouserList: function(req,res,next){
        complaintDao.queryHouserList(req,res,next);
    },

    getSysList: function(req,res,next){
        complaintDao.querySysList(req,res,next);
    },

    getDetailById: function(req,res,next){
        complaintDao.queryDetailById(req,res,next);
    },

    dealComplaint: function(req,res,next){
        complaintDao.updateDealInfo(req,res,next);
    },

    cancelComplaint: function(req,res,next){
        complaintDao.delComplaint(req,res,next);
    },
}