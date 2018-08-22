'use strict';
module.exports = (sequelize, DataTypes) => {
  var Marcada = sequelize.define('Marcada', {
    hour: {
      type: DataTypes.DATE,
      allowNull: false
    },
    isEnter: DataTypes.BOOLEAN,
    ipAddress: {
      type: DataTypes.STRING(70),
    },
    colaboradorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
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