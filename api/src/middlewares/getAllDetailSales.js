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
const getDBDetailSalesValidateStock = async (id) => {
    let detailSales = await Detailsale.findAll({
        where: {
            userId: id,
            saleId: null,
        },
        include: {
            model: Product
        }
    });
    let detailSalesOutStock = []
    detailSales.forEach((detailSale) => {
        if (detailSale.product.stock < detailSale.quantity) {
            detailSalesOutStock.push(detailSale)
        }
    })
    return detailSalesOutStock;
};
const getDBDetailSalesByPk = async (id, userId) => {
    let detailSales = await Detailsale.findAll({
        where: {
            id,
            userId,
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
            delete e.product
            delete e.id
            const [detailsale, isCreatedDetailSale] = await Detailsale.findOrCreate({
                where: {
                    productId: e.productId,
                    userId: model.id,
                    saleId: null,
                },
                defaults: e
            })
            if(!isCreatedDetailSale){
                await Detailsale.update(
                e,
                {
                    where: {
                        id: detailsale.id,
                    },
                }
            )
            }
        })

        return "bulk upload detailed sales created successfully"
    } else {
        if (info.productId && info.quantity) {
            delete info.saleId
            delete info.userId
            const product = info.product
            delete info.product
            delete info.id
            const [detailsale, isDetailsale] = await Detailsale.findOrCreate({
                where: {
                    productId: info.productId,
                    userId: model.id,
                    saleId: null,
                },
                defaults: info
            })
            
            if (!isDetailsale) {
                await Detailsale.update(
                    info,
                    {
                        where: {
                            id: detailsale.id,
                        },
                    }
                );
            }
            return `${product.name} has been added to cart`
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
const dbDeleteDetailSale = async (id) => {
    await Detailsale.destroy({
        where: {
            id,
            saleId: null,
        },
    });
    return `detail sale id:${id} deleted successfully`

}
module.exports = {
    getDBDetailSales,
    getDBDetailSalesValidateStock,
    getDBDetailSalesByPk,
    dbCreateDetailSale,
    dbUpdateDetailSale,
    dbDeleteDetailSale,
};