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
                return `hours ${hourId} of day ${code} updated successfully`
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
    return `hours id:${hourId} deleted successfully`
}
module.exports = {
    dbUpdateHour,
    dbDeleteHour,
}