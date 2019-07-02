var parkDao = require('../dao/parkDao');
var lockUtil = require('../util/lock');
var util = require('../util/util');
module.exports = {
  add: function(req,res,next){
    parkDao.add(req,res,next);
  },

  checkpNameRepeat: function(req,res,next){
    parkDao.querypNumberRepeat(req,res,next);
  },

  getAll: function(req,res,next){
    parkDao.queryAll(req,res,next);
  },

  getById: function(req,res,next){
    parkDao.queryById(req,res,next);
  },

  updateAll: function(req,res,next){
    parkDao.updateAll(req,res,next); 
  }

}