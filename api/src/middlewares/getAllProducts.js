const Sequelize = require('sequelize')
const {Product, Op} = require('../db.js') 

// const JsonProducts = require('../Data/products.json')

const getAllProducts = async () => {
    const dbInfo = await Product.findAll()
    // if(!dbInfo) {
    //     dbInfo =  await Product.bulkCreate(JsonProducts)
    // }
    return dbInfo;
}

const getProductByPk = async (id) => {
    const dbInfo = await Product.findAll({where: {id}})
    return dbInfo[0];
}

module.exports = {
    getAllProducts,
    getProductByPk,
}