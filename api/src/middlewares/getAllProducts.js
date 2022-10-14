const { Product, Image } = require("../db.js");
const { Op } = require("sequelize");

const getAllProducts = async () => {
  const products = await Product.findAll({
    include: Image
  });
  return products;
};

const getProductByPk = async (id) => {
  const product = await Product.findAll({ 
    where: { 
      id 
    },
    include: Image 
  });
  
  if (!product.length) {
    throw new Error("product not found");
  }
  return product[0];
};

const getProductByName = async (name) => {
  const product = await Product.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });
  return product;
};
const dbCreateProduct = async (info) => {
  await Product.create(info)
  return `product ${info.name} created`
}
const dbUpdateProduct = async (info, id) => {
  const [response] = await Product.update(
    info,
    {
      where: {
        id,
      },
    }
  );
  if (response) {
    return `product id:${id} updated successfully`;
  } else {
    throw new Error("product not found");
  }
}
const dbDeleteProduct = async (id) => {
  await Product.destroy({
    where: { id },
    include: {model:Image},
  });
  return `product id:${id} deleted successfully`
};
module.exports = {
  getAllProducts,
  getProductByPk,
  getProductByName,
  dbCreateProduct,
  dbUpdateProduct,
  dbDeleteProduct,
};
