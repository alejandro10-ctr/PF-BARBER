const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { compareSync } = require("bcryptjs");
const { User } = require("../db");
const { transporter } = require("../../configs/mailer");

exports.register = async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.status(404).send({
      success: false,
      error: "Must complete all fields",
    });
  } else {
    let passHash = await bcryptjs.hash(password, 8);
    const user = User.create({
      user: req.body.username,
      password: passHash,
      email: email,
    })
      .then((user) => {
        sendEmail(email);
        res.send({
          success: true,
          message: "User succesfully add",
          user: {
            id: user.id,
            username: user.user,
            email: user.email,
          },
        });
      })
      .catch((err) => {
        res.send({
          success: false,
          message: "Something went wrong",
          error: err,
        });
      });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  User.findOne({
    where: {
      user: username,
    },
  }).then((user) => {
    // NOT FINDED USER
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Could not found user",
      });
    }
    //INCORRET PASSWORD
    if (!compareSync(password, user.password)) {
      return res.status(404).send({
        success: false,
        message: "Incorrect password",
      });
    }

    const payload = {
      user: user.user,
      id: user.id,
    };
    const token = jwt.sign(payload, "secretKey", { expiresIn: "1d" });
    const cookiesOptions = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.cookie("jwt", token, cookiesOptions);

    return res.status(200).send({
      success: true,
      message: "Logged in successfully",
      token: "Bearer " + token,
    });
  });
};

exports.protectedRoute = async (req, res) => {
  try {
    res.status(200).send({
      success: true,
      user: {
        id: req.user.id,
        username: req.user.user,
      },
    });
  } catch (error) {
    res.send(error);
  }
};

exports.logout = (req, res) => {
  res.clearCookie("jwt");
  console.log("success logout");
  return res.redirect("/");
};

const sendEmail = async (email) => {
  await transporter.sendMail({
    from: '"HENRY BARBER" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject: "¡Bienvenido a Henry Barber!", // Subject line
    text: "¡Gracias! Estamos encantados de que formes parte de nuestra comunidad", // plain text body
    html: "<b>Al registrarte se te enviaran descuentos =)</b>", // html body
  });
};

exports.loginGoogle = async (req, res) => {
  res.send(req.user);
};
