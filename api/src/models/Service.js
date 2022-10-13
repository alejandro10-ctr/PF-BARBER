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
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    time: {
        type: DataTypes.DATE,
        allowNull: false,
    }
  }, {
    timestamp: false,
    createdAt: false,
    updatedAt: false,
  });
};
