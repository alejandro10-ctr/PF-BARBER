const { Router } = require("express");
const { User } = require("../db.js");
const {
  getDBUsers,
  getDBUserByPk,
  getUserByName,
} = require("../middlewares/getAllUsers.js");
const { Op } = require("sequelize");

const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    const apiInfo = await getDBUsers();
    if (name) {
      const apiInfo = await getUserByName(name);
      return res
        .status(200)
        .send(
          apiInfo.length >= 1
            ? apiInfo
            : "No existe ningún usuario con ese nombre"
        );
    }
    res.status(200).json(apiInfo);
  } catch (error) {
    res.status(404).send(error);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await getDBUsers();
    const user = await getDBUserByPk(id);
    res.status(200).json(user[0]);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});
router.post("/", async (req, res) => {
  const { name, lastname, email, password, phone, image, birthday } = req.body;

  try {
    const userCreated = await User.create({
      name,
      lastname,
      email,
      password,
      phone,
      image,
      birthday,
    });
    res.json(userCreated);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
module.exports = router;
