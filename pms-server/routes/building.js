var express = require('express');
var router = express.Router();
var buildingCtrl = require('../controllers/buildingCtrl')

// router.get('/queryAll',buildingCtrl);

router.post('/add',buildingCtrl.add)

router.get('/check',buildingCtrl.checkName);

router.get('/getAll',buildingCtrl.getAll);

router.get('/getById',buildingCtrl.getById);

router.post('/updateAll',buildingCtrl.updateAll);

router.get('/getCBList',buildingCtrl.getCBList);

router.post('/delBuilding',buildingCtrl.delBuilding);

module.exports = router;