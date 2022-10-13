const { Sequelize } = require('sequelize')
const { Appointment, User } = require('../db.js')

const JSONAppointments = require('../Data/appointment.json')

const getAllAppointments = async () => {

    let dbInfo = await Appointment.findAll();
    if(!dbInfo) {
        dbInfo = await Appointment.bulkCreate(JSONAppointments)
    }
    return dbInfo;
}