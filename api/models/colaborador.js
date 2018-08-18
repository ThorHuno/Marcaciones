'use strict';
module.exports = (sequelize, DataTypes) => {
  var Colaborador = sequelize.define('Colaborador', {
    email: DataTypes.STRING,
    isEnable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
      tableName: 'colaboradores'
    });
  Colaborador.associate = function (models) {
    // associations can be defined here
    models.Colaborador.hasMany(models.Marcada);
  };
  return Colaborador;
};