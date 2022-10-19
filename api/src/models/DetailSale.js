const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("detailsale", {
    cantidad: {
      type: DataTypes.INTEGER,
      valueDefault: 1
    },
    iva: {
      type: DataTypes.INTEGER,
      valueDefault: 0
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
