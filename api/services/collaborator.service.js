var models = require('../models');

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
}

module.exports = ColaboradorService;