var colaboradorServices = require('../services/collaborator.service');

class CollaboratorController {
    async create(req, res) {
        let args = req.body;
        var colaboradorService = new colaboradorServices();

        // if (!args.email)
        //     return res
        //         .status(500)
        //         .json({ error: "El campo email es requerido", timestamp: new Date() });

        // var existingActiveEmail = await colaboradorService.where({ 'email': args.email, 'isEnable': true });

        // if (existingActiveEmail.length)
        //     return res
        //         .status(500)
        //         .json({ error: `Ya existe un registro con email ${args.email}`, timestamp: new Date() });

        try {
            let newRecord = await colaboradorService.save(args);

            res
                .status(200)
                .json({ data: newRecord.id, timestamp: new Date() });
        } catch (error) {
            res
                .status(500)
                .json({ error: error.message, timestamp: new Date() });
        }
    }

    async getAll(req, res) {
        var collaboratorService = new colaboradorServices();
        try {
            var collaborators = await collaboratorService.getAll();

            res
                .status(200)
                .json({ data: collaborators, timestamp: new Date() });
        }
        catch (error) {
            res
                .status(500)
                .json({ error: error.message, timestamp: new Date() });
        }
    }

    async update(req, res) {
        var colaboradorService = new colaboradorServices();
        try {
            await colaboradorService.update(req.body);

            res
                .status(200)
                .json({ data: true, timestamp: new Date() });
        } catch (error) {
            res
                .status(500)
                .json({ error: error.message, timestamp: new Date() });
        }
    }

    async get(req, res) {
        var collaboratorService = new colaboradorServices();
        try {
            var collaborator = await collaboratorService.get(req.params.id);

            res
                .status(200)
                .json({ data: collaborator, timestamp: new Date() });
        }
        catch (error) {
            res
                .status(500)
                .json({ error: error.message, timestamp: new Date() });
        }
    }
}

module.exports = CollaboratorController;