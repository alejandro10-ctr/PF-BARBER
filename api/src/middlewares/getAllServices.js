const { QueryTypes, Sequelize } = require('sequelize');
const { Service, Schedule, Day, Hour, conn, Op } = require('../db.js');

const JSONServices = require('../Data/services.json')

const getDBServices = async () => {

    let db = await Service.findAll({
        include: {
            model: Schedule,
            include: {
                model: Day,
                include: Hour
            }
        }
    })
    if (!db.length) {
        db = await Service.bulkCreate(JSONServices, { validate: true })
    }
    return db
}

const getDBServiceByPk = async id => {
    if(id){
        let db = await Service.findAll({
            where:{
                id
            },
            include: {
                model: Schedule,
                include: {
                    model: Day,
                    include: Hour
                }
            }
        })
        if (!db.length) {
            throw new Error('service not found')
        }
    
        return db[0];
    }else{
        throw new Error('missing serviceId')
    }
}
const getDBServiceCreate = async (body) => {
    const {name , price , available , time} = body
    if (name && price && available && time) {
        return await Service.create(body)
    } else {
        throw new Error('missing params')
    }
}
module.exports = {
    getDBServices,
    getDBServiceByPk,
    getDBServiceCreate,

}
