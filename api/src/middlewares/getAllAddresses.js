const { QueryTypes, Sequelize, Op } = require("sequelize");
const { Address, conn } = require("../db.js");

const getDBAddresses = async (modelAddress,userId) => {
    let addresses = await modelAddress.findAll({
        where: { userId }
    })
    return addresses
}
const dbCreateAddress = async (modelAddress, info, model) => {

    if (info.nameUser && info.phoneUser && info.address) {
        const [address, createdAddress] = await modelAddress.findOrCreate({
            where: {
                address: info.address,
            },
            defaults: info
        })
        if (createdAddress) {
            model.addAddress(address)
            return `address ${info.address} created successfully`
        }
        throw new Error('address already exists')
    } else {
        throw new Error('missing param')
    }
}
const dbUpdateAddress = async (modelAddress, info, id) => {
    if (info.nameUser && info.phoneUser && info.address) {
        const address = await modelAddress.findOne({
            where: { address: info.address }
        })
        if (!address) {
            const [response] = await modelAddress.update(
                info,
                {
                    where: {
                        id,
                    },
                }
            );
            if (response) {
                return `address id:${info.address} updated successfully`;
            }
            throw new Error('address not found');
        } else {
            throw new Error('address already exists');
        }
    } else {
        throw new Error('missing param')
    }
}
const dbDeleteAddress = async (modelAddress, id) => {
    const response = await modelAddress.destroy({
        where: {
            id,
        },
    });
    return `address id:${id} deleted successfully`

}

module.exports = {
    getDBAddresses,
    dbCreateAddress,
    dbUpdateAddress,
    dbDeleteAddress,
}