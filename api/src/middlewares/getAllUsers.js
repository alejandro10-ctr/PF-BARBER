const { QueryTypes, Sequelize, where } = require("sequelize");
const { User, Sale, Detailsale, Product, Image, conn } = require("../db.js");
const { Op } = require("sequelize");

const OBJUsers = [
  {
    name: "sakura",
    lastname: "kinomoto",
    email: "kinomoto@gmail.com",
    user: "sakurachan",
    password: "123456",
    phone: "57-777-3301329"
  },
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
    where: { id },
    include: ["addresses", {
      model: Sale,
      include: {
        model: Detailsale,
        include: {
          model: Product,
          include: Image
        }
      }
    }]
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
const dbUpdateUser = async (info, modelUser) => {
  delete info.id
  delete info.addresses
  delete info.sales
  delete info.autByGoogle

  for (const property in info) {
    modelUser[property] = info[property]
  }
  modelUser.save()
  return `user ${info.name} updated successfully`;
}
module.exports = {
  getDBUsers,
  getDBUserByPk,
  getUserByName,
  dbCreateUser,
  dbUpdateUser,
};
