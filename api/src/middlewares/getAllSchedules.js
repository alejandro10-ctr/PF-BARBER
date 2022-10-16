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
            return `schedule id:${service.scheduleId} updated successfully`
        } else {
            throw new Error('schedule not found')
        }
    } else {
        throw new Error('missing params')
    }
}
const dbDeleteSchedule = async (id) => {
    if (id) {
        await Schedule.destroy({
            where: { id },
            include: {
                model: Day,
                include: Hour
            }
        })
        return `schedule id:${id} deleted successfully`
    } else {
        throw new Error('schedule not found')
    }
}
module.exports = {
    getDBSchedules,
    dbUpdateSchedule,
    dbDeleteSchedule,
}