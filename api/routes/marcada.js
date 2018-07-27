var models = require('../models');
var express = require('express');
var router = express.Router();

router.post('/marcada', (req, res) => {
    var args = req.body;
    models.Marcada.create({
        'hour': new Date(),
        'isEnter': args.isEnter,
        'ipAddress': req.connection.remoteAddress,
        'colaboradorId': args.colaboradorId
    }).then(record => {
        res.status(200).json({
            data: record.id,
            timestamp: new Date()
        });
    }).catch(error => {
        res.status(500).json({
            error,
            timestamp: new Date()
        });
    });
});

module.exports = router;