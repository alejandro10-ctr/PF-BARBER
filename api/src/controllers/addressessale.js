const { Router } = require("express");
const { Addresssale } = require("../db.js");
const { getDBAddresses, dbCreateAddress, dbUpdateAddress, dbDeleteAddress } = require('../middlewares/getAllAddresses.js')
const { getDBSaleByPk } = require("../middlewares/getAllSales.js");

const router = Router()

router.get('/sale/:userId', async (req, res) => {
    try {
        const addresses = await getDBAddresses(Addresssale, req.params.userId)
        res.status(200).json(addresses)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.post('/sale/:userId', async (req, res) => {
    try {
        const sale = await getDBSaleByPk(req.params.userId);
        const createdAddress = await dbCreateAddress(Addresssale, req.body, sale)
        res.status(200).send(createdAddress);
    } catch (error) {
        res.status(404).send(error.message);
    }
})
router.put('/:addressId', async (req, res) => {
    try {
        delete req.body.saleId
        const updatedAddress = await dbUpdateAddress(Addresssale, req.body, req.params.addressId);
        res.status(200).send(updatedAddress)
    } catch (error) {
        res.status(404).send(error.message);
    }
})

router.delete('/:addressId', async (req, res) => {
    try {
        const deletedAddress = await dbDeleteAddress(Addresssale, req.params.addressId);
        res.status(200).send(deletedAddress)
    } catch (error) {
        res.status(404).send(error.message);
    }
})


module.exports = router