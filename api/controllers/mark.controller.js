var marcadaServices = require('../services/mark.service');

class MarkController {
    async create(req, res) {
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
                .json({ data: newRecord.id, timestamp: new Date() });
        } catch (error) {
            res
                .status(500)
                .json({ error: error.message, timestamp: new Date() });
        }
    }
}

module.exports = MarkController;