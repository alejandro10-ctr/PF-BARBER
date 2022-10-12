const { QueryTypes, Sequelize } = require('sequelize');
const { User, conn, Op } = require('../db.js');

const getDBUsers = async () => {

    let db = await User.findAll()
    if (!db.length) {
        db = await User.bulkCreate([{
            name: "yeiber",
            lastname: "reyes",
            birthday: "22-04",
            email:"yeiberey@gmail.com",
            password: "123456",
            phone: "57-3203301329"
        }])
    }
    return db
}
const getDBUserByPk = async id => {
    const db = await User.findAll({
        where: { id },
    })
    return db
}
module.exports = {
    getDBUsers,
    getDBUserByPk,
}
