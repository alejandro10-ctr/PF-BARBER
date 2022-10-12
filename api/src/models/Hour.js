const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  return sequelize.define('hour', {
    first: {
      type: DataTypes.STRING(4),
      allowNull: false,
    },
    last: {
      type: DataTypes.STRING(4),
      allowNull: false,
    },
  }, {
    timestamp: false,
    createdAt: false,
    updatedAt: false,
  });
};