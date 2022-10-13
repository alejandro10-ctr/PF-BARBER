const { QueryTypes, Sequelize } = require('sequelize');
const { Service, conn, Op } = require('../db.js');

const JSONServices = require('../Data/services.json')

const getDBServices = async () => {

    let db = await Service.findAll()
    if (!db.length) {
        db = await Service.bulkCreate(JSONServices,{validate:true})
    }
    return db
}
module.exports = {
    getDBServices,
}
