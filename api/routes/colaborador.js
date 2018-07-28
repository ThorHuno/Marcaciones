var express = require('express');
var router = express.Router();
var colaboradorServices = require('../services/colaborador.service');

router.post('/colaborador', async(req, res) => {
    let args = req.body;
    let colaboradorService = new colaboradorServices();

    try
    {
        let newRecord = await colaboradorService.save(args.email);

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