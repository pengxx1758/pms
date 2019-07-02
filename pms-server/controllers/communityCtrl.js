var communityDao = require('../dao/communityDao');
var lockUtil = require('../util/lock');
var util = require('../util/util');
module.exports = {
    communityList: function(req,res,next){
        communityDao.communityList(req,res,next);
    },
    add: function(req,res,next){
        communityDao.add(req,res,next);
    },
    queryById: function(req,res,next){
        communityDao.queryById(req,res,next);
    },
    check: function(req,res,next){
        communityDao.checkRepeat(req,res,next);
    },
    updateAll: function(req,res,next){
        communityDao.updateAll(req,res,next);
    },
    getIdandName: function(req,res,next){
        communityDao.queryIdandName(req,res,next);
    }
}


