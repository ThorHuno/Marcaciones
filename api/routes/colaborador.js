var models = require('../models');
var express = require('express');
var router = express.Router();

router.post('/colaborador', (req, res) => {
    var args = req.body;
    models.Colaborador.findOne({
        where: {
            email: args.email
        }
    }).then(record => {
        if (record)
            res.status(500).json({
                error: `Ya existe un registro con email ${args.email}`,
                timestamp: new Date()
            });
    });

    models.Colaborador.create({
        'email': args.email
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