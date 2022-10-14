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
const dbUpdateSchedule = async ({ state }, service) => {
    if (typeof state !== "undefined") {
        const [response] = await Schedule.update({ state }, {
            where: {
                id: service.scheduleId
            }
        })
        if (response) {
            return `updated schedule id:${service.scheduleId}`
        } else {
            throw new Error('schedule not found')
        }
    } else {
        throw new Error('missing params')
    }
}
const dbDeleteSchedule = async (service) => {
    if (service.scheduleId) {
        await Schedule.destroy({
            where: { id: service.scheduleId },
            include: {
                model: Day,
                include: Hour
            }
        })
    } else {
        throw new Error('schedule not found')
    }
}
module.exports = {
    getDBSchedules,
    dbUpdateSchedule,
    dbDeleteSchedule,
}