const { User } = require("../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../../configs/auth");

const singIn = (req, res) => {
  let { email, password } = req.body;
  User.findOne({
    where: {
      email: email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ msg: "User doesnt exists" });
      } else {
        if (bcrypt.compareSync(password, user.password)) {
          let token = jwt.sign({ user: user }, authConfig.secret, {
            expiresIn: authConfig.expires,
          });

          res.json({
            user: user,
            token: token,
          });
        } else {
          res.status(401).send({ msg: "contraseña incorrecta" });
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const singUp = async (req, res) => {
  //encriptamos la password
  // if(req.body.password > 6) {
  //  let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds))
  // }else {
  //     return res.status(404).send('la pass debe tener minimo 6 caracteres')
  // }
  let password = bcrypt.hashSync(
    req.body.password,
    Number.parseInt(authConfig.rounds)
  );

  // crea un usuario
  try {
    const userCreated = await User.create({
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      password: password,
      phone: req.body.phone,
      birthday: req.body.birthday,
    });

    let token = jwt.sign({ user: userCreated }, authConfig.secret, {
      expiresIn: authConfig.expires,
    });

    res.json({
      user: userCreated,
      token: token,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  singUp,
  singIn,
};
