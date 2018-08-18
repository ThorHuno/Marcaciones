var colaboradorServices = require('../services/collaborator.service');

class CollaboratorController {
    async create(req, res) {
        let args = req.body;
        let colaboradorService = new colaboradorServices();

        if (!args.email)
            return res
                .status(500)
                .json({ error: "El campo email es requerido", timestamp: new Date() });

        var existingActiveEmail = await colaboradorService.where({ 'email': args.email, 'isEnable': true });

        if (existingActiveEmail.length)
            return res
                .status(500)
                .json({ error: `Ya existe un registro con email ${args.email}`, timestamp: new Date() });

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