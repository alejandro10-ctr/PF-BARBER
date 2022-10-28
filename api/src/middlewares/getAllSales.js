const { QueryTypes, Sequelize } = require("sequelize");
const { Sale, Detailsale, Product, Image, conn } = require("../db.js");
const { Op } = require("sequelize");


const getDBSalesByUser = async (id) => {
    let sales = await Sale.findAll({
        where: {
            userId: id,
        },
        include: {
            model: Detailsale,
            include: {
                model: Product,
                include: Image
            }
        }
    });
    return sales;
};
const getDBSaleByPk = async (id) => {
    const sale = await Sale.findOne({
        where: { id },
        include: {
            model: Detailsale,
            include: {
                model: Product,
                include: Image
            }
        }
    });
    if (!sale) {
        throw new Error("sale not found");
    }
    return sale;
};
const dbCreateSale = async (info, user, detailSales) => {

    const sale = await Sale.create(info)
    await user.addSale(sale)
    await sale.addDetailsales(detailSales)
    return `sale created successfully`
}
const dbUpdateSale = async (info, id, dbUpdateProduct) => {
    delete info.userId
    delete info.id
    delete info.state // test <------------------------
    let sale = await getDBSaleByPk(id)
    if (sale.state) {
        throw new Error("not can update");
    } else {

        if (!info.state) {
            try {
                await sale.detailsales.map(async (detailSale) => {

                    console.log(detailSale.product.stock, detailSale.quantity)
                    if (detailSale.product.stock < detailSale.quantity) {
                        throw new Error("not in stock", detailSale);
                    } else {
                        detailSale.product.stock -= detailSale.quantity
                        await dbUpdateProduct({ stock: detailSale.product.stock }, detailSale.productId)

                    }
                })

            } catch (error) {

                throw new Error(error);
            }
        }
        const response = await Sale.update(info, {
            where: { id }
        })

        if (response) {
            return `sale updated successfully`;
        } else {
            throw new Error("sale not found");
        }
    }
}

module.exports = {
    getDBSalesByUser,
    getDBSaleByPk,
    dbCreateSale,
    dbUpdateSale,
};