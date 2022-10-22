const { Router } = require("express");
const { Addresssale } = require("../db.js");
const { getDBAddresses, dbCreateAddress, dbUpdateAddress, dbDeleteAddress } = require('../middlewares/getAllAddresses.js')
const { getDBSaleByPk } = require("../middlewares/getAllSales.js");

const router = Router()

router.get('/sale/:saleId', async (req, res) => {
    try {
        const addresses = await getDBAddresses(Addresssale, "saleId", req.params.saleId)
        res.status(200).json(addresses)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.post('/sale/:saleId', async (req, res) => {
    try {
        const sale = await getDBSaleByPk(req.params.saleId)
        console.log(sale.addAddresssale)
        const createdAddress = await dbCreateAddress(Addresssale, req.body, "saleId", sale.addAddresssale)
        res.status(200).send(sale);
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