'use strict';
module.exports = (sequelize, DataTypes) => {
  var Marcada = sequelize.define('Marcada', {
    hour: DataTypes.DATE,
    isEnter: DataTypes.BOOLEAN,
    ipAddress: DataTypes.STRING,
    colaboradorId: DataTypes.INTEGER
  }, {
    tableName: 'marcadas'
  });
  Marcada.associate = function (models) {
    // associations can be defined here
    models.Marcada.belongsTo(models.Colaborador, {
      onDelete: "CASCADE",
      foreignKey: {
        fieldName: 'colaboradorId',
        allowNull: false
      }
    });
  };
  return Marcada;
};