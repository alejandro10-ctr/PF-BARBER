const { Router } = require("express");
const { User } = require("../db.js");
const authController = require("../middlewares/authNuevo");
const passport = require("passport");
const jwt = require("jsonwebtoken");

//asd
const router = Router();

router.post(
  "/register",
  // passport.authenticate("jwt", { session: false }),
  authController.register
);
router.post(
  "/login",
  // passport.authenticate("jwt", { session: false }),
  authController.login
);
router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  authController.protectedRoute
);
router.get("/logout", authController.logout);
// router.get(
//   "/google",
//   passport.authenticate("google", {
//     scope: [
//       "https://www.googleapis.com/auth/userinfo.profile",
//       "https://www.googleapis.com/auth/userinfo.email",
//     ],
//     session: false,
//   }),
//   authController.loginGoogle
// );

//ruta para Registrarse

// router.get(
//   "/google/callback",
//   passport.authenticate("sign-in-google", {
//     scope: ["profile", "email"],
//     session: false,
//   }),
//   function (req, res) {
//     // res.send("je");
//     res.redirect("http://localhost:3000/login");
//   }
// );

//rutas para Iniciar Sesion
router.get(
  "/google/signup",
  passport.authenticate("sign-up-google", {
    scope: ["profile", "email"],
    session: false,
  }),
  async function (req, res) {
    if (req.user) {
      // console.log("SOY EL ID AL CREAR", req.user);
      // me traigo el id de la db y se lo asigno al token
      console.log("soy user id", req.user.id);

      const token = jwt.sign({ id: req.user.id }, "secretKey", {
        expiresIn: 60 * 60 * 24, // equivalente a 24 horas
      });
      res.cookie("token", token);
      res.redirect("http://localhost:3000/");
    } else {
      res.redirect("http://localhost:3000/login");
    }
  }
);

module.exports = router;
