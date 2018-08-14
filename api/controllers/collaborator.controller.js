var colaboradorServices = require('../services/colaborador.service');

class CollaboratorController {
    async create(req, res) {
        let args = req.body;
        let colaboradorService = new colaboradorServices();

        try {
            let newRecord = await colaboradorService.save(args.email);

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

module.exports = CollaboratorController;