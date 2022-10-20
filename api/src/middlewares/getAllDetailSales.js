const { QueryTypes, Sequelize } = require("sequelize");
const { User, Detailsale, Product, Image, conn } = require("../db.js");
const { Op } = require("sequelize");

const getDBDetailSales = async (id) => {
    let detailSales = await Detailsale.findAll({
        where: {
            userId: id,
            saleId: null,
        },
        include: {
            model: Product,
            include: Image
        }
    });
    // if (!detailSales.length) {
    //     detailSales = await Detailsale.bulkCreate(OBJUsers, { validate: true });
    // }
    return detailSales;
};
const dbCreateDetailSale = async (info, model) => {

    if (info.productId && info.quantity) {
        delete info.saleId
        delete info.userId
        const [detailsale, isDetailsale] = await Detailsale.findOrCreate({
            where: {
                productId: info.productId,
                userId: model.id,
                saleId: null,
            },
            defaults: info
        })
        if (isDetailsale) {
            model.addDetailsale(detailsale)
            return "detail sale created successfully"
        }
        return "detail sale already exists"
    } else {
        throw new Error('missing param')
    }
}
const dbUpdateDetailSale = async (info, id) => {
    if (info.productId && info.quantity) {
        delete info.productId
        delete info.userId
        delete info.saleId
        const [response] = await Detailsale.update(
            info,
            {
                where: {
                    id,
                },
            }
        );
        if (response) {
            return `detail sale id:${id} updated successfully`;
        } else {
            throw new Error("detail sale not found");
        }
    } else {
        throw new Error('missing param')
    }
}
const dbDeleteDetailSale = async id => {
    const response = await Detailsale.destroy({
        where: {
            id,
            saleId: null
        },
    });
    console.log(response)
    return `detail sale id:${id} deleted successfully`

}
module.exports = {
    getDBDetailSales,
    dbCreateDetailSale,
    dbUpdateDetailSale,
    dbDeleteDetailSale,
};