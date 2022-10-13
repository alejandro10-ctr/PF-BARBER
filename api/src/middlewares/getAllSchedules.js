const { QueryTypes, Sequelize } = require('sequelize');
const { Schedule, Day, Hour, conn, Op } = require('../db.js');
const getDBSchedules = async () => {
    let db = await Schedule.findAll({

        include: {
            model: Day,
            include: Hour
        }
    })
    return db
}
const dbUpdateSchedule = async (body, service) => {
    const { state } = body
    if (typeof state !== "undefined") {
        let schedule = await Schedule.findByPk(service.scheduleId)
        schedule.state = state
        schedule.save()
        return `updated schedule id:${service.scheduleId}`
    } else {
        throw new Error('missing params')
    }
}
module.exports = {
    getDBSchedules,
    dbUpdateSchedule,
}