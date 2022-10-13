const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("sale", {
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        validate: {
            isDate: true,
        }
    }
  }, {
    timestamp: false,
    createdAt: false,
    updatedAt: false,
  });
};
