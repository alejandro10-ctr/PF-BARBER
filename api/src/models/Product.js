const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "product",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(256),
        defaultValue: "",
      },
      price: {
        type: DataTypes.STRING,
        defaultValue: 0,
      },
      quality: {
        type: DataTypes.ENUM(["basic", "premium"]),
        defaultValue: "basic",
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
        defaultValue: 10,
      },

      image: {
        type: DataTypes.TEXT,
        defaultValue:
          "https://consumercomplaintscourt.com/wp-content/uploads/2015/12/no_uploaded.png",
      },
      score: {
        type: DataTypes.INTEGER,
        defaultValue: 5,
        validate: { min: 1, max: 5 },
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      isReview: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      promedio: {
        type: DataTypes.STRING,
        defaultValue: 0,
        validate: { min: 0, max: 5 },
      },
    },
    {
      timestamp: false,
      createdAt: false,
      updatedAt: false,
    }
  );
};
