const { QueryTypes, Sequelize } = require('sequelize');
const { Schedule, Day, Hour, conn, Op } = require('../db.js');
const getDBDays = async () => {
    let db = await Day.findAll()
    return db
}
const dbCreateDay = async ({ code, state, first, last, serviceId }) => {
    const [schedule, createdSchedule] = await Schedule.findOrCreate({
        where: { serviceId },
        defaults: {
            state: true
        }
    })
    const name = code === 'dom' ? 'domingo' : code === 'lun' ? 'Lunes' : code === 'mar' ? 'Martes' : code === 'mie' ? 'Miércoles' : code === 'jue' ? 'Juevez' : code === 'vie' ? 'Viernes' : 'Sábado'

    const [day, createdDay] = await Day.findOrCreate({
        where: { code, scheduleId: schedule.id },
        defaults: { name, state: true }
    })
    const [firstHour, firstMin, lastHour, lastMin] = [Math.round(first.substr(0, 2)), Math.round(first.substr(2, 2)), Math.round(last.substr(0, 2)), Math.round(last.substr(2, 2))]
    const [hour] = await Hour.findOrCreate({
        where:{first, last, dayId: day.id }
    })
    return hour
}
module.exports = {
    getDBDays,
    dbCreateDay,
}