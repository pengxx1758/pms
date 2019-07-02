var positionDao = require('../dao/positionDao');
var lockUtil = require('../util/lock');
var util = require('../util/util');
module.exports = {
  getAllStaff: function(req,res,next){
      positionDao.queryAllStaffBycId(req,res,next);
  },

  hasPhone: function(req,res,next){
      positionDao.checkPhoneRepeat(req,res,next);
  },

  addManager: function(req,res,next){
    positionDao.addManager(req,res,next);
  },

  addPos: function(req,res,next){
    positionDao.insertPos(req,res,next);
  },

  getPermssionById: function(req,res,next){
    positionDao.queryPremissionById(req,res,next);
  },

  getPermssionByuserId: function(req,res,next){
    positionDao.queryPremissionByuserId(req,res,next);
  },

  updatePermission: function(req,res,next){
    positionDao.updatePermission(req,res,next);
  },

  getById: function(req,res,next){
    positionDao.queryAllPos(req,res,next);
  },

  getDetailById: function(req,res,next){
    positionDao.queryDetailById(req,res,next);
  },

  delById: function(req,res,next){
    positionDao.delById(req,res,next);
  },
}