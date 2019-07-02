var express = require('express');
var router = express.Router();
var systemCtrl = require('../controllers/systemCtrl')

router.post('/add',systemCtrl.add);

router.post('/updateUser',systemCtrl.updateUser);

router.get('/getById',systemCtrl.getById);

router.post('/updateSysInfo',systemCtrl.updateSysInfo);

module.exports = router;