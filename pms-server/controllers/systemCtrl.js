var systemDao = require('../dao/systemDao');
var lockUtil = require('../util/lock');
var util = require('../util/util');
module.exports = {
    add: function (req, res, next) {
        systemDao.add(req, res, next);
    },

    updateUser: function (req, res, next) {
        systemDao.updateUser(req, res, next);
    },

    getById: function (req, res, next) {
        systemDao.queryById(req, res, next);
    },

    updateSysInfo: function (req, res, next) {
        systemDao.updateSysInfo(req, res, next);
    },
}