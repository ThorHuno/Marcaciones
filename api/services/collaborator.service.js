var models = require('../models');
var nameOf = require('../utils/utils').nameOf;

class ColaboradorService {
    async save(obj) {
        var model = models.Colaborador.build(obj);

        var validation = await model.validate();

        let existingRecord = await this.findByField('email', obj.email);

        if (existingRecord)
            throw new Error(`Ya existe un registro con email ${obj.email}`);

        return validation.save();
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
        return models.Colaborador.findAll({
            where: predicate
        });
    }

    async getAll() {
        return await models.Colaborador.findAll({
            attributes: ['id', 'email', 'firstName', 'secondName', 'surName', 'secondSurName', 'isEnable', 'createdAt']
        });
    }

    async get(id) {
        var existingCollaborator = await models.Colaborador.findById(id, {
            attributes: ['id', 'email', 'isEnable', 'createdAt','firstName','secondName','surName','secondSurName']
        });

        if (!existingCollaborator)
            throw new Error(`El registro con id ${id} no existe.`);

        return existingCollaborator;
    }

    async update(id,obj) {
        if (!obj || !Object.keys(obj).length)
            throw new Error(`El parámetro collaborator es requerido.`);

        var existingCollaborator = await models.Colaborador.findById(id);

        if (!existingCollaborator)
            throw new Error(`El registro con id ${collaborator.id} no existe.`);

        await existingCollaborator.update({
            isEnable: obj.isEnable,
            firstName: obj.firstName,
            secondName: obj.secondName,
            surName: obj.surName,
            secondSurName: obj.secondSurName
        });
    }
}

module.exports = ColaboradorService;