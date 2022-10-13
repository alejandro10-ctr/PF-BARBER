const { QueryTypes, Sequelize } = require('sequelize');
const { Schedule, conn, Op } = require('../db.js');
const JSONSchedules = require('../Data/schedules.json')
const getDBSchedules = async () => {
    let db = await Schedule.findAll()
    if (!db.length) {
        console.log(db)
        db = await Schedule.bulkCreate(JSONSchedules)
    }
    return db
}
module.exports = {
    getDBSchedules,
}