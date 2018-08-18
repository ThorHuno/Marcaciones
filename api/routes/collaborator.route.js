var express = require('express');
var router = express.Router();
var collaboratorController = require('../controllers/collaborator.controller');

var controller = new collaboratorController();
router.post('/collaborator', controller.create);

module.exports = router;