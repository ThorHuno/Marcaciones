var express = require('express');
var router = express.Router();
var collaboratorController = require('../controllers/collaborator.controller');

var controller = new collaboratorController();
router.get('/collaborator', controller.getAll);
router.get('/collaborator/:id', controller.get);
router.post('/collaborator', controller.create);
router.put('/collaborator', controller.update);

module.exports = router;