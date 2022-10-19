const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("address", {
    nameUser: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneUser: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(50),
      valueDefault: ""
    },
    description: {
      type: DataTypes.STRING(50),
      valueDefault: ""
    },
  }, {
    timestamp: false,
    createdAt: false,
    updatedAt: false,
  });
};
