var feeDao = require('../dao/feeDao');
var lockUtil = require('../util/lock');
var util = require('../util/util');
module.exports = {
    add: function (req, res, next) {
        feeDao.insertFee(req, res, next);
    },

    addFeeItem: function (req, res, next) {
        feeDao.insertFeeItem(req, res, next);
    },

    getAllFeeItem: function (req, res, next) {
        feeDao.queryAllFeeItem(req, res, next);
    },
    getAllSysFee: function (req, res, next) {
        feeDao.queryAllSysFee(req, res, next);
    },
    getAllHouserFee: function (req, res, next) {
        feeDao.queryAllHouserFee(req, res, next);
    },
    delFeeItem: function (req, res, next) {
        feeDao.delFeeItem(req, res, next);
    },
    updateFee: function (req, res, next) {
        feeDao.updateFee(req, res, next);
    },
    updateFeeState: function (req, res, next) {
        feeDao.updateFeeState(req, res, next);
    },

}