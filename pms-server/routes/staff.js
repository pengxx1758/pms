var express = require('express');
var router = express.Router();
var staffCtrl = require('../controllers/staffCtrl')

router.post('/add',staffCtrl.add);

router.get('/getAll',staffCtrl.getAll);

router.get('/getById',staffCtrl.getById);

router.post('/updateAll',staffCtrl.updateAll);

router.post('/delById',staffCtrl.delById);



module.exports = router;