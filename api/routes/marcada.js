var express = require('express');
var router = express.Router();
var marcadaServices = require('../services/marcada.service');

router.post('/marcada', async(req, res) => {
    let args = req.body;
    let marcadaService = new marcadaServices();

    try {
        let marcada = {
            ...args,
            ipAddress: req.connection.remoteAddress,
            hour: new Date()
        };
        let newRecord = await marcadaService.save(marcada);

        res
            .status(200)
            .json({data: newRecord.id, timestamp: new Date()});
    } catch (error) {
        res
            .status(500)
            .json({error: error.message, timestamp: new Date()});
    }
});

module.exports = router;