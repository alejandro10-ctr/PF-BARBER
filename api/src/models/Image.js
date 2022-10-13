const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("image", {
    urlImage: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    timestamp: false,
    createdAt: false,
    updatedAt: false,
  });
};
