var express = require('express');
var router = express.Router();
var parkCtrl = require('../controllers/parkCtrl')

router.post('/add',parkCtrl.add);

router.get('/check',parkCtrl.checkpNameRepeat);

router.get('/getAll',parkCtrl.getAll);

router.get('/getById',parkCtrl.getById);

router.post('/updateAll',parkCtrl.updateAll);

module.exports = router;