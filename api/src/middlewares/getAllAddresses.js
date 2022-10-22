const { QueryTypes, Sequelize, Op } = require("sequelize");
const { Address, conn } = require("../db.js");

const getDBAddresses = async (modelAddress, nameAttribute, modelId) => {
    let addresses = await modelAddress.findAll({
        where: { [nameAttribute]: modelId}
    })
    return addresses
}
const dbCreateAddress = async (modelAddress, info, nameAttribute, metodoAdd) => {

    if (info.nameUser && info.phoneUser && info.address) {
        const [address, createdAddress] = await modelAddress.findOrCreate({
            where: {
                address: info.address,
            },
            defaults: info
        })
        console.log(metodoAdd)
        if (createdAddress || !address[nameAttribute]) {
            metodoAdd(address)
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