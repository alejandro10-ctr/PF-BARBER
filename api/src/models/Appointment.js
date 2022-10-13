const { DataTypes } = require("sequelize");
// const { uuid } = require('uuidv4');

// Tabla Activity. Cada propiedad es el nombre de cada columna en la tabla.
module.exports = (sequelize) => {
  sequelize.define("appointment", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    details: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamp: false,
    createdAt: false,
    updatedAt: false,
  }
  );
};