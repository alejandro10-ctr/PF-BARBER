const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("addresssale", {
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
      defaultValue: ""
    },
    description: {
      type: DataTypes.STRING(50),
      defaultValue: ""
    },
  }, {
    timestamp: false,
    createdAt: false,
    updatedAt: false,
  });
};
