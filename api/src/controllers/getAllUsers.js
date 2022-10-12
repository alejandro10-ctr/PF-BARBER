const { QueryTypes, Sequelize } = require('sequelize');
const { User, conn, Op } = require('../db.js');

const JSONUsers = require('../Data/users.json')

const getDBUsers = async () => {

    let db = await User.findAll()
    if (!db.length) {
        db = await User.bulkCreate(JSONUsers)
    }
    return db
}
const getDBUserByPk = async id => {
    const db = await User.findAll({
        where:{id},})
    return db
}
module.exports = {
    getDBUsers,
    getDBUserByPk,
}
