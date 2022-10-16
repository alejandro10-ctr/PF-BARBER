const { QueryTypes, Sequelize } = require('sequelize');
const { Schedule, Day, Hour, conn, Op } = require('../db.js');

const dbCreateDay = async (body, model) => {
    const { code, first, last } = body
    if (code.length && first && last) {
        const [schedule, createdSchedule] = await Schedule.findOrCreate({
            where: { id: model.scheduleId },
            defaults: {
                state: true
            }
        })
        if (createdSchedule) {
            model.scheduleId = schedule.id
            model.save()
        }
        const name = (code) => {
            return code === 'dom' ? 'domingo' : code === 'lun' ? 'Lunes' : code === 'mar' ? 'Martes' : code === 'mie' ? 'Miércoles' : code === 'jue' ? 'Juevez' : code === 'vie' ? 'Viernes' : 'Sábado'
        }
        const findCreateDay = async (code) => {
            const [day] = await Day.findOrCreate({
                where: { code, scheduleId: schedule.id },
                defaults: { name: name(code), state: true }
            })
            await Hour.findOrCreate({
                where: { first, last, dayId: day.id }
            })
            return day
        }
        if (typeof code === "string") {
            const day = await findCreateDay(code)
            return `day ${code} created successfully`
        } else {
            await code.map(async code => {
                const day = await findCreateDay(code)
            })
            return `days ${code.length > 2 ? code.splice(0, code.length - 2).join(', ') + ", " + code[code.length - 2] + " and " + code[code.length - 1] : code.length === 2 ? code[0] + " and " + code[1] : code[0]} created successfully`
        }
    } else {
        throw new Error('missing params')
    }
}
const dbUpdateDay = async ({ state }, { code }, model) => {
    if (typeof state !== "undefined") {
        const [response] = await Day.update({ state }, {
            where: {
                scheduleId: model.scheduleId,
                code
            }
        })
        if (response) {
            return `day ${code} updated successfully`
        } else {
            throw new Error('day not found')
        }
    } else {
        throw new Error('missing params')
    }
}
const dbDeleteDay = async (code, model) => {
    if (model.scheduleId) {
        await Day.destroy({
            where: { code, scheduleId: model.scheduleId, },
            include: Hour
        })
        return `day ${code} deleted successfully`
    } else {
        throw new Error('schedule not found')
    }
}
module.exports = {
    dbCreateDay,
    dbUpdateDay,
    dbDeleteDay,
}