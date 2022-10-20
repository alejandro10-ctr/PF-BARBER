const { Router } = require("express");
const { getDBDetailSales, dbCreateDetailSale, dbUpdateDetailSale, dbDeleteDetailSale } = require("../middlewares/getAllDetailSales.js");
const { getDBUserByPk } = require('../middlewares/getAllUsers')
const router = Router();

router.get("/user/:userId", async (req, res) => {
    try {
        const detailSales = await getDBDetailSales(req.params.userId);
        res.status(200).json(detailSales);
    } catch (error) {
        res.status(404).send(error.message);
    }
});
router.post('/user/:userId', async (req, res) => {
    try {
        const user = await getDBUserByPk(req.params.userId)
        const createdDetailSale = await dbCreateDetailSale(req.body, user);
        res.status(200).send(createdDetailSale)
    } catch (error) {
        res.status(404).send(error.message);
    }
})
router.put('/:detailsaleId', async (req, res) => {
    try {
        const updatedDetailSale = await dbUpdateDetailSale(req.body, req.params.detailsaleId);
        res.status(200).send(updatedDetailSale)
    } catch (error) {
        res.status(404).send(error.message);
    }
})
router.delete('/:detailsaleId', async (req, res) => {
    try {
        const deletedDetailSale = await dbDeleteDetailSale(req.params.detailsaleId);
        res.status(200).send(deletedDetailSale)
    } catch (error) {
        res.status(404).send(error.message);
    }
})


module.exports = router;