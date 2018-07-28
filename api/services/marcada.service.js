var models = require('../models');

class MarcadaService {
    async save(marcada) {
        return await models
            .Marcada
            .create(marcada);
    }
}

module.exports = MarcadaService;