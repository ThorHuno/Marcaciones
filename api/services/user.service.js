var models = require('../models');

class UserService {
    async save(user) {
        let existingRecord = await this.findByField('strategyId', user.strategyId);

        if (!existingRecord) 
            return await models.User.create(user);
        
        return existingRecord;
    }

    async findByField(field, value) {
        return models
            .User
            .findOne({
                where: {
                    [field]: value
                }
            })
    }

    async findById(id) {
        return models
            .User
            .findById(id);
    }
}

module.exports = UserService;