const { QueryTypes, Sequelize } = require("sequelize");
const { Sale, Detailsale, Product, Image, conn } = require("../db.js");
const { Op } = require("sequelize");


const getDBSales = async (id) => {
    let sales = await Sale.findAll({
        where: {
            userId: id,
        },
        include: {
            model: Detailsale,
            include: {
                model: Product,
                include: Image
            }
        }
    });
    return sales;
};
const getDBSaleByPk = async (id) => {
  const sale = await Sale.findOne({
    where: { id },
    include: 'addresssale'
  });
  if (!sale) {
    throw new Error("sale not found");
  }
  return sale;
};
const dbCreateSale = async (info, user, detailSales) => {
    
    const sale = await Sale.create(info)
    await user.addSale(sale)
    await sale.addDetailsales(detailSales)
    return `sale created successfully`
}

module.exports = {
    getDBSales,
    getDBSaleByPk,
    dbCreateSale,
};