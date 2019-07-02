var staffdDao = require('../dao/staffDao');
var lockUtil = require('../util/lock');
var util = require('../util/util');
module.exports = {
    add: function(req,res,next){
        staffdDao.add(req,res,next);
    },
  
    getAll: function(req,res,next){
        staffdDao.queryAll(req,res,next);
    },
  
    getById: function(req,res,next){
        staffdDao.queryById(req,res,next);
    },
  
    updateAll: function(req,res,next){
        staffdDao.updateAll(req,res,next);
    },

    delById: function(req,res,next){
        staffdDao.delById(req,res,next);
    }
}