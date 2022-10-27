const { Router } = require("express");
const { User } = require("../db.js");
const authController = require("../middlewares/authNuevo");
const passport = require("passport");

//asd
const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  authController.protectedRoute
);
router.get("/logout", authController.logout);

module.exports = router;
