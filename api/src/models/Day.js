const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("day", {
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    state: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      valueDefault: true
    },
  }, {
    timestamp: false,
    createdAt: false,
    updatedAt: false,
  });
};
