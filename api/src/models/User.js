const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlpha: {
            msg: "The user must not contain spaces"
        },
        len: {
            args: [2,255],
            msg: "The user must only contain at least two letters"
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
            args: [2,255],
            msg: "The name must only contain at least two letters"
        }
      }
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    genre:{
        type: DataTypes.ENUM(["man", "woman","binarie"]),
        allowNull: false,
        validate: {
          isIn: {
            args: [["man", "woman","binarie"]],
            msg: "You must decide if man, woman or binarie only"
          }
        },
        defaultValue: "binarie"
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        validate:{
            isEmail: true
        }
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: { 
                args: [6, 255],
                msg: "The password length should be between 6 and 255 characters."
             }
        } 
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: "This phone number is already register"
        },
        validate: {
            is: {
                args: /^((\+|)[0-9]{1,3}(-|\s)[0-9]{2,4}(-|\s)[0-9]{6,8})$/,
                msg: "Enter a valid phone"
            }
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
    available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    isBarber: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    addProduct : {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    deleteProduct: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }

  }, {
    timestamp: false,
    createdAt: false,
    updatedAt: false,
  });
};
