const { QueryTypes, Sequelize } = require("sequelize");
const { User, conn } = require("../db.js");
const { Op } = require("sequelize");

const JSONUsers = require("../Data/users.json");

const getDBUsers = async () => {
  let db = await User.findAll();
  return db;
};

const getDBUsers2 = async (email) => {
  let db = await User.findAll({
    where: {
      email,
    },
  });
  return db;
};
getUserByName = async (name) => {
  let db = await User.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });
  return db;
};
const getDBUserByPk = async (id) => {
  const db = await User.findAll({
    where: { id },
  });
  return db;
};
module.exports = {
  getDBUsers,
  getDBUserByPk,
  getUserByName,
};
