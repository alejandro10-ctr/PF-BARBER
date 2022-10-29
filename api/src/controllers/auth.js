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
  authController.loginGoogle
);

module.exports = router;
