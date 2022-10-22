const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("addresssale", {
    nameUser: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneUser: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          is: {
              args: /^((\+|)[0-9]{1,3}(-|\s)[0-9]{2,4}(-|\s)[0-9]{6,8})$/,
              msg: "Enter a valid phone"
          }
      },
    },
    address: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(50),
      defaultValue: ""
    },
  }, {
    timestamp: false,
    createdAt: false,
    updatedAt: false,
  });
};
