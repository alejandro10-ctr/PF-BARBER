const { QueryTypes, Sequelize } = require('sequelize');
const { Hour, conn, Op } = require('../db.js');
const dbUpdateHour = async ({ first, last }, { code, hourId }) => {
    if (first && last) {
        if (first.length === 4 && last.length === 4) {
            const [response] = await Hour.update({ first, last }, {
                where: {
                    id: hourId,
                }
            })
            if (response) {
                return `updated hours of day code:${code}`
            } else {
                throw new Error('hours not found')
            }
        } else {

            throw new Error('wrong hours')
        }
    } else {
        throw new Error('missing params')
    }
}
const dbDeleteHour = async ({ hourId }) => {
    await Hour.destroy({
        where: { id: hourId }
    })
}
module.exports = {
    dbUpdateHour,
    dbDeleteHour,
}