const { Router } = require("express");
const { User } = require("../db.js");
const authController = require("../middlewares/auth");

//asd
const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.isAuthenticated, authController.login);
router.get("/logout", authController.logout);

module.exports = router;
