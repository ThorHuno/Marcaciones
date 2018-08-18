var models = require('../models');
var nameOf = require('../utils/utils').nameOf;

class ColaboradorService {
    async save(email) {
        let existingRecord = await this.findByField('email', email);

        if (existingRecord)
            throw new Error(`Ya existe un registro con email ${email}`);

        return await models
            .Colaborador
            .create({ 'email': email });

    }

    async findByField(field, value) {
        return models
            .Colaborador
            .findOne({
                where: {
                    [field]: value
                }
            })
    }

    async where(predicate) {
        return models.Colaborador.findAll({ where: predicate });
    }

    async getAll() {
        return await models.Colaborador.findAll({ attributes: ['id', 'email', 'isEnable', 'createdAt'] });
    }

    async get(id) {
        var existingCollaborator = await models.Colaborador.findById(id, { attributes: ['id', 'email', 'isEnable', 'createdAt'] });

        if (!existingCollaborator)
            throw new Error(`El registro con id ${id} no existe.`);

        return existingCollaborator;
    }

    async update(collaborator) {
        if (!collaborator || !Object.keys(collaborator).length)
            throw new Error(`El parámetro collaborator es requerido.`);

        var existingCollaborator = await models.Colaborador.findById(collaborator.id);

        if (!existingCollaborator)
            throw new Error(`El registro con id ${collaborator.id} no existe.`);

        await existingCollaborator.update({
            isEnable: collaborator.isEnable
        });
    }
}

module.exports = ColaboradorService;