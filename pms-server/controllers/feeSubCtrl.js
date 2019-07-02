var feeSubDao = require('../dao/feeSubDao');
var lockUtil = require('../util/lock');
var util = require('../util/util');
module.exports = {
    add: function(req,res,next){
        feeSubDao.insertFeeSub(req,res,next);
    },
    
    getAll: function(req,res,next){
        feeSubDao.queryAll(req,res,next);
    },

    delFeeSub: function(req,res,next){
        feeSubDao.delById(req,res,next);
    },

    getAllbytype: function(req,res,next){
        feeSubDao.queryAllbyType(req,res,next);
    }
}