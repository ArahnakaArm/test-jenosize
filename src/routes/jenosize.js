const express = require('express');
const router = express.Router();
const jenosizeCtrl = require('../controllers/jenosize.ctrl');
const validate = require('../middleware/validate');

router.get('/findRestaurant', validate.findRestaurantValidate, jenosizeCtrl.findRestaurant);
router.post('/twentyfourGame', validate.twentyfourGameValidate, jenosizeCtrl.twentyfourGame);
router.get('/loginweb', jenosizeCtrl.renderLogin);
router.post('/login', jenosizeCtrl.login);
router.post('/xoGame', validate.xoGameValidate, jenosizeCtrl.xoGame);

module.exports = router;
