const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("detailsale", {
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: {
        min:1
      }
    },
    iva: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    description: {
      type: DataTypes.STRING(50),
      defaultValue: ""
    },
    state: {
      type: DataTypes.INTEGER,
      defaultValue: 2,
      validate: {
        min: 0,
        max: 2
      }
    },
    descriptionState: {
      type: DataTypes.STRING(50),
      defaultValue: ""
    },
  }, {
    timestamp: false,
    createdAt: false,
    updatedAt: false,
  });
};
