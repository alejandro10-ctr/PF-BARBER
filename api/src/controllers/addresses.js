const { Router } = require("express");
const { Address } = require("../db.js");
const { getDBAddresses, dbCreateAddress, dbUpdateAddress, dbDeleteAddress } = require('../middlewares/getAllAddresses.js')
const { getDBUserByPk } = require("../middlewares/getAllUsers.js");

const router = Router()

router.get('/user/:userId', async (req, res) => {
    try {
        const addresses = await getDBAddresses(Address, req.params.userId)
        res.status(200).json(addresses)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.post('/user/:userId', async (req, res) => {
    try {
        const user = await getDBUserByPk(req.params.userId);
        const createdAddress = await dbCreateAddress(Address, req.body, user)
        res.status(200).send(createdAddress);
    } catch (error) {
        res.status(404).send(error.message);
    }
})
router.put('/:addressId', async (req, res) => {
    try {
        delete req.body.userId
        const updatedAddress = await dbUpdateAddress(Address, req.body, req.params.addressId);
        res.status(200).send(updatedAddress)
    } catch (error) {
        res.status(404).send(error.message);
    }
})

router.delete('/:addressId', async (req, res) => {
    try {
        const deletedAddress = await dbDeleteAddress(Address, req.params.addressId);
        res.status(200).send(deletedAddress)
    } catch (error) {
        res.status(404).send(error.message);
    }
})
module.exports = router