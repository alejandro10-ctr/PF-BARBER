const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { User } = require("../db");
const { promisify } = require("util");
const Swal = require("sweetalert2");
const { getDBUsers } = require("../middlewares/getAllUsers");
const { transporter } = require("../../configs/mailer");
//procedimiento para registrarnos
exports.register = async (req, res) => {
  try {
    let passHash = await bcryptjs.hash(req.body.password, 8);

    await User.create({
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      password: passHash,
      phone: req.body.phone,
    }).then((user) => {
      console.log(user);
      if (!user) {
        return res.status(404);
      } else {
        sendEmail(req.body.email);
        res.send("Cuenta registrada con exito");
        // res.redirect("/");
      }
    });
  } catch (error) {
    console.log(error);
    res.status(404);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(404).send("debes ingresar algo");
    } else {
      const userFinded = await User.findOne({
        where: {
          email,
        },
      });
      console.log("USUARIO ENCONTRADO:", userFinded);
      if (
        !userFinded ||
        !(await bcryptjs.compare(password, userFinded.password))
      ) {
        res.status(404).send("Email o contraseña incorrecta");
      } else {
        console.log("USUARIO ENCONTRADO:", userFinded);
        const id = userFinded.id;
        const token = jwt.sign({ id: id }, "secretKey");
        console.log("TOKEN: " + token + " para el USUARIO : " + userFinded);
        const cookiesOptions = {
          expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };
        res.cookie("jwt", token, cookiesOptions);
        res.send("Usuario logeado");
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
      console.log(decodificada);
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
//asdasdas
exports.logout = (req, res) => {
  res.clearCookie("jwt");
  return res.redirect("/");
};

//
const sendEmail = async (email) => {
  await transporter.sendMail({
    from: '"HENRY BARBER" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });
};
