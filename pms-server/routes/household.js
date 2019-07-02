var express = require('express');
var router = express.Router();
var householdCtrl = require('../controllers/householdCtrl')

router.post('/add',householdCtrl.add);

router.get('/getAll',householdCtrl.getAll);

router.get('/getById',householdCtrl.getById);

router.post('/updateAll',householdCtrl.updateAll);

router.get('/getAllCB',householdCtrl.getAllCB);

router.get('/check',householdCtrl.checkPhoneRepeat);

router.post('/addUser',householdCtrl.addUser);

router.post('/login',householdCtrl.login);

router.post('/checkHouser',householdCtrl.checkHouser);

router.get('/getAllbybId',householdCtrl.getAllBybId);



module.exports = router;