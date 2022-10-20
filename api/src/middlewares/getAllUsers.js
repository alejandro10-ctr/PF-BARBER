const { QueryTypes, Sequelize, where } = require("sequelize");
const { User, Sale, Detailsale, Product, Image, conn } = require("../db.js");
const { Op } = require("sequelize");

const OBJUsers = [
  {
    name: "yeiber",
    lastname: "reyes",
    birthday: "1998-05-22",
    email: "yeiberey@gmail.com",
    user: "yeiberey",
    password: "123456",
    phone: "57-320-3301329"
  }
];

const getDBUsers = async () => {
  let users = await User.findAll();
  if (!users.length) {
    users = await User.bulkCreate(OBJUsers, { validate: true });
  }
  return users;
};
const getDBUserByPk = async (id) => {
  const user = await User.findOne({
    where: { id }
  });
  if (!user) {
    throw new Error("user not found");
  }
  return user;
};
const getUserByName = async (name) => {
  const users = await User.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });
  return users;
};
const dbCreateUser = async (info) => {
  await User.create(info)
  return `user ${info.name} created successfully`
}
const dbUpdateUser = async (info, id) => {
  const [response] = await User.update(
    info,
    {
      where: {
        id,
      },
    }
  );
  if (response) {
    return `user ${info.name} updated successfully`;
  } else {
    throw new Error("user not found");
  }
}
module.exports = {
  getDBUsers,
  getDBUserByPk,
  getUserByName,
  dbCreateUser,
  dbUpdateUser,
};
