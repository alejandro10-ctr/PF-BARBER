const { Router } = require("express");
const { getDBSales, dbCreateSale } = require('../middlewares/getAllSales.js')
const { getDBDetailSales } = require("../middlewares/getAllDetailSales.js");
const { getDBUserByPk } = require("../middlewares/getAllUsers.js");
const router = Router();

router.get("/user/:userId", async (req, res) => {
    try {
        const sales = await getDBSales(req.params.userId);
        res.status(200).json(sales);
    } catch (error) {
        res.status(404).send(error.message);
    }
});


router.post('/user/:userId', async (req, res) => {
    try {
        const user = await getDBUserByPk(req.params.userId);
        const detailSales = await getDBDetailSales(req.params.userId);
        if (detailSales.length) {
            const createdSale = await dbCreateSale(req.body, user, detailSales)
            res.status(200).send(createdSale);
        } else {
            throw new Error('detail sales not found')
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
})

module.exports = router;