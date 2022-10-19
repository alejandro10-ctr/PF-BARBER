const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { User } = require("../db");
const { promisify } = require("util");
const Swal = require("sweetalert2");

//procedimiento para registrarnos
exports.register = async (req, res) => {
  try {
    let passHash = await bcryptjs.hash(req.body.password, 8);

    const userCreated = await User.create({
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      password: passHash,
      phone: req.body.phone,
      birthday: req.body.birthday,
    });

    if (userCreated) {
      res.redirect("/login");
    }

    //   console.log(passHash);
    // conexion.query(
    //   "INSERT INTO USERS SET ?",
    //   {
    //     name: name,
    //     pass: passHash,
    //     user: user,
    //   },
    //   (error, results) => {
    //     if (error) {
    //       console.log(error);
    //     }
    //     res.redirect("/login");
    //   }
    // );
  } catch (error) {
    console.log(error);
  }
};

// exports.login = (req, res) => {
//   res.send("holi");
// };

exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userFinded = await User.findOne({
      email,
    });

    if (!userFinded) {
      return res.status(403);
    } else {
      if (
        userFinded.length === 0 ||
        !(await bcryptjs.compare(password, userFinded.password))
      ) {
        res.render("login", {
          alert: true,
          alertTitle: "Error",
          alertMessage: "Usuario y/o Password incorrectas",
          alertIcon: "error",
          showConfirmButton: true,
          timer: false,
          ruta: "login",
        });
      } else {
        const id = userFinded.id;
        const token = jwt.sign({ id: id }, "secretKey");
        console.log("TOKEN: " + token + " para el USUARIO : " + userFinded);
        const cookiesOptions = {
          expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };
        res.cookie("jwt", token, cookiesOptions);
        res.render("login", {
          alert: true,
          alertTitle: "Conexión exitosa",
          alertMessage: "¡LOGIN CORRECTO!",
          alertIcon: "success",
          showConfirmButton: false,
          timer: 800,
          ruta: "",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.isAuthenticated = async (req, res, next) => {
  if (req.cookies.jwt) {
    /* VERIFICA EL TOKEN DE LA COOKIE CON EL DEL USUARIO DE LA BASE DE DATOS**/
    try {
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        "secretKey"
      );
      const compareUser = await User.findAll({
        where: {
          id: [decodificada.id],
        },
      });
      if (!compareUser) {
        return next();
      }
      req.user = compareUser[0];
      next();
    } catch (error) {
      console.log(error);
      return next();
    }
  } else {
    res.redirect("/login");
    next();
  }
};

exports.logout = (req, res) => {
  res.clearCookie("jwt");
  return res.redirect("/");
};
