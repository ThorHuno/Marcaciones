var express = require('express');
var router = express.Router();
var markController = require('../controllers/mark.controller');

var controller = new markController();

router.post('/marcada', controller.create);

module.exports = router;