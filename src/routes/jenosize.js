const express = require('express');
const router = express.Router();
const jenosizeCtrl = require('../controllers/jenosize.ctrl');
const validate = require('../middleware/validate');

router.post('/findRestaurant', validate.findRestaurantValidate, jenosizeCtrl.findRestaurant);
router.post('/twentyfourGame', validate.twentyfourGamaValidate, jenosizeCtrl.twentyfourGame);
router.get('/login', jenosizeCtrl.renderLogin);
router.post('/login', jenosizeCtrl.login);

module.exports = router;
