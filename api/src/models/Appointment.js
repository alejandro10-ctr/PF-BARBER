const { DataTypes } = require("sequelize");
const { uuid } = require('uuidv4');

// Tabla Activity. Cada propiedad es el nombre de cada columna en la tabla.
module.exports = (sequelize) => {
  sequelize.define(
    "appointment",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
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
    },
  );
};