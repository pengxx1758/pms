var buildingDao = require('../dao/buildingDao');
var lockUtil = require('../util/lock');
var util = require('../util/util');
module.exports = {
    add: function(req,res,next){
        buildingDao.add(req,res,next);
    },
    
    checkName: function(req,res,next){
        buildingDao.checkNameRepeat(req,res,next);
    },

    getAll: function(req,res,next){
        buildingDao.queryAll(req,res,next);
    },

    getById: function(req,res,next){
        buildingDao.queryById(req,res,next);
    },

    updateAll: function(req,res,next){
        buildingDao.updateAll(req,res,next);
    },

    getCBList: function(req,res,next){
        buildingDao.queryCnameAndBname(req,res,next);
    },

    delBuilding: function(req,res,next){
        buildingDao.delById(req,res,next);
    }
}