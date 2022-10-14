const Sequelize = require("sequelize");
const { Product } = require("../db.js");
const { Op } = require("sequelize");

const JsonProducts = require("../Data/products.json");

const getAllProducts = async () => {
  const dbInfo = await Product.findAll();
  if (!dbInfo) {
    dbInfo = await Product.bulkCreate(JsonProducts);
  }
  return dbInfo;
};

const getProductByPk = async (id) => {
  const dbInfo = await Product.findAll({ where: { id } });
  return dbInfo[0];
};

const getProductByName = async (name) => {
  const db = await Product.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });
  return db;
};

module.exports = {
  getAllProducts,
  getProductByPk,
  getProductByName,
};
