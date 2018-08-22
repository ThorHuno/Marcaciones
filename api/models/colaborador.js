'use strict';
module.exports = (sequelize, DataTypes) => {
  var Colaborador = sequelize.define('Colaborador', {
    email: {
      type: DataTypes.STRING(60),
      isUnique: true,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "El campo email no tiene un formato válido."
        },
        len: {
          args: [1, 60],
          msg: "Email puede contener un máximo de 60 caracteres"
        }
      }
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        // notNull: {
        //   msg: "El campo firstName es requerido."
        // },
        len: {
          args: [1, 50],
          msg: "FirstName puede contener un máximo de 50 caracteres"
        }
      }
    },
    secondName: {
      type: DataTypes.STRING(50)
    },
    surName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        // notNull: {
        //   msg: "El campo surName es requerido."
        // },
        len: {
          args: [1, 50],
          msg: "SurName puede contener un máximo de 50 caracteres"
        }
      }
    },
    secondSurName: {
      type: DataTypes.STRING(50)
    },
    isEnable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }
  }, {
    tableName: 'colaboradores'
  }, {
    getterMethods: {
      fullName() {
        return this.firstname + ' ' + this.surName
      }
    }
  });

  Colaborador.associate = function (models) {
    // associations can be defined here
    models.Colaborador.hasMany(models.Marcada);
  };

  return Colaborador;
};