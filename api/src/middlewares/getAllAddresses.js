const { QueryTypes, Sequelize, Op } = require("sequelize");
const { Address, conn } = require("../db.js");

const getDBAddresses = async (userId) => {
    let addresses = await Address.findAll({
        where: { userId },
        order: [
            ['id', 'ASC']
        ]
    })
    return addresses
}

const getDBAddressByPk = async (id) => {
    const address = await Address.findOne({
      where: { id },

    });
    if (!address) {
      throw new Error("address not found");
    }
    return address;
  };
const dbCreateAddress = async (info) => {
    if (info.personReceives && info.phoneReceives && info.address) {

        return await Address.findOrCreate({
            where: { address: info.address },
            defaults: info
        })


    } else {
        throw new Error('missing param')
    }
}
const dbUpdateAddress = async (info, id) => {
    if (info.personReceives && info.phoneReceives && info.address) {
        delete info.userId
        const address = await Address.findOne({
            where: { address: info.address }
        })

        if (address ? address.id === Math.round(id) : true) {
            const [response] = await Address.update(
                info,
                {
                    where: {
                        id,
                    },
                }
            );
            if (response) {
                return `address ${info.address} updated successfully`;
            }
            throw new Error('address not found');
        } else {
            throw new Error('address already exists');
        }
    } else {
        throw new Error('missing param')
    }
}
const dbDeleteAddress = async (id) => {
    const response = await Address.destroy({
        where: {
            id,
        },
    });
    return `address id:${id} deleted successfully`

}

module.exports = {
    getDBAddresses,
    getDBAddressByPk,
    dbCreateAddress,
    dbUpdateAddress,
    dbDeleteAddress,
}