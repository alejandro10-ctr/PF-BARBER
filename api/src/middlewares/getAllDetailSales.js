const { QueryTypes, Sequelize, Op } = require("sequelize");
const { User, Detailsale, Product, Image, conn } = require("../db.js");

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
    return detailSales;
};
const dbCreateDetailSale = async (info, model) => {
    if (Array.isArray(info)) {
        await info.map(async (e) => {
            delete e.saleId
            delete e.userId
            
            const [detailsale, isDetailsale] = await Detailsale.findOrCreate({
                where: {
                    productId: e.productId,
                    userId: model.id,
                    saleId: null,
                },
                defaults: e
            })
            return detailsale
        })
        
        return "bulk upload detailed sales created successfully"
    } else {
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
            throw new Error('detail sale already exists')
        } else {
            throw new Error('missing param')
        }
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
    return `detail sale id:${id} deleted successfully`

}
module.exports = {
    getDBDetailSales,
    dbCreateDetailSale,
    dbUpdateDetailSale,
    dbDeleteDetailSale,
};