const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("service", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      valueDefault: ""
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER,
        valueDefault: 5,
        validate: {
          min:5,
          max: 120
        }
    }
  }, {
    timestamp: false,
    createdAt: false,
    updatedAt: false,
  });
};
