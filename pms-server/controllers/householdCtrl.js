var householdDao = require('../dao/householdDao');
var lockUtil = require('../util/lock');
var util = require('../util/util');
module.exports = {
    add: function (req, res, next) {
        householdDao.add(req, res, next);
    },
    getAll: function (req, res, next) {
        householdDao.queryAll(req, res, next);
    },
    getById: function (req, res, next) {
        householdDao.queryById(req, res, next);
    },
    updateAll: function (req, res, next) {
        householdDao.updateAll(req, res, next);
    },
    getAllCB: function (req, res, next) {
        householdDao.queryAllCB(req, res, next);
    },

    checkPhoneRepeat: function (req, res, next) {
        householdDao.queryHousePhoneRepeat(req, res, next);
    },

    addUser: function (req, res, next) {
        householdDao.addUser(req, res, next);
    },

    login: function (req, res, next) {
        householdDao.login(req, res, next);
    },

    checkHouser: function (req, res, next) {
        householdDao.updateStateById(req, res, next);
    },

    getAllBybId: function (req, res, next) {
        householdDao.queryAllbybId(req, res, next);
    },




}