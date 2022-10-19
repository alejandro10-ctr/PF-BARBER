const { Router } = require("express");
const { User } = require("../db.js");
const authController = require("../middlewares/auth");

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

module.exports = router;
