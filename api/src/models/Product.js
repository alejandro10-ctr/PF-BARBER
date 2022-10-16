const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "product",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
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
      quality: {
        type: DataTypes.ENUM(["basic", "premium"]),
        allowNull: false,
        validate: {
          isIn: {
            args: [["basic", "premium"]],
            msg: "You must decide if basic or premium only",
          },
        },
        defaultValue: "basic",
      },
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue:
          "https://consumercomplaintscourt.com/wp-content/uploads/2015/12/no_uploaded.png",
      },
      score: {
        type: DataTypes.ENUM(["0", "1", "2", "3", "4", "5"]),
        allowNull: false,
        defaultValue: "0",
      },
    },
    {
      timestamp: false,
      createdAt: false,
      updatedAt: false,
    }
  );
};
