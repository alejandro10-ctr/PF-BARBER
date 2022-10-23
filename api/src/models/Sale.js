const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define("sale", {
    personReceives: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneReceives: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          is: {
              args: /^((\+|)[0-9]{1,3}(-|\s)[0-9]{2,4}(-|\s)[0-9]{6,8})$/,
              msg: "Enter a valid phone"
          }
      },
    },
    address: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    descriptionPlace: {
      type: DataTypes.STRING(50),
      defaultValue: ""
    },
    descriptionPackage: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        validate: {
            isDate: true,
        }
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    shipping: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
  }, {
    timestamp: false,
    createdAt: false,
    updatedAt: false,
  });
};
