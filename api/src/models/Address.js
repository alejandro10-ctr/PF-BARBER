const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("address", {
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
    zipCode: {
      type: DataTypes.STRING(10),
      defaultValue: ""
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  }, {
    timestamp: false,
    createdAt: false,
    updatedAt: false,
  });
};
