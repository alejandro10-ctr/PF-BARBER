const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("user", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isAlpha: true,
      }
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birthday: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            isDate: true
        }
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                args: true,
                msg: "You must enter a valid email"
            }
        }
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: { 
                args: [6, 20],
                msg: "The password length should be between 6 and 20 characters."
             }
        } 
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isNumeric: {
                args: true,
                msg: "You must enter a phone number"
            },
            len: {
                args: [11,11],
                msg: "Phone number is invalid"
            },
            isInt: {
                args: true,
                msg: "You must enter a phone number"
            },
            is: ^((\+|)[0-9]{1,3}(-|\s)[0-9]{2,4}(-|\s)[0-9]{6,8})$
        }
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: "https://spng.pngfind.com/pngs/s/676-6764065_default-profile-picture-transparent-hd-png-download.png"
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: 
    },
    isBarber: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
    addProduct : {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
    deleteProduct: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }

  });
};
