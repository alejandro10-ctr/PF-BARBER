const { QueryTypes, Sequelize } = require('sequelize');
const { Schedule, Day, Hour, conn, Op } = require('../db.js');
const getDBDays = async () => {
    let db = await Day.findAll()
    return db
}
const dbCreateDay = async (body, service) => {
    const { code, first, last } = body
    if (code.length && first && last) {
        const [schedule, createdSchedule] = await Schedule.findOrCreate({
            where: { id: service.scheduleId },
            defaults: {
                state: true
            }
        })
        if (createdSchedule) {
            service.scheduleId = schedule.id
            service.save()
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
            return `day ${code} created`
        } else {
            code.map(async code => {
                const day = await findCreateDay(code)
            })
            return `days ${code.length > 2 ?code.splice(0,code.length-2).join(', ')+", "+code[code.length-2]+" and "+code[code.length-1]:code.length === 2?code[0]+" and "+code[1]:code[0]} created`
        }
    } else {
        console.log('missing params')
        throw new Error('missing params')
    }
}
const dbUpdateDay = async (body, code,service) => {
    const { state } = body
    if (typeof state !== "undefined") {
        let day = await Day.findAll({
            where:{
                scheduleId: service.scheduleId,
                code 
            }
        })
        if(day.length){
            day = day[0]
            day.state = state
            day.save()
            return `updated schedule id:${code}`
        }else{
            throw new Error('day not found')
        }
    } else {
        throw new Error('missing params')
    }
}
module.exports = {
    dbCreateDay,
    dbUpdateDay,
}