const { Router } = require("express");
const { getDBAddresses, getDBAddressByPk, dbCreateAddress, dbUpdateAddress, dbDeleteAddress } = require('../middlewares/getAllAddresses.js')
const { getDBUserByPk } = require("../middlewares/getAllUsers.js");

const router = Router()

router.get('/:userId/addresses', async (req, res) => {
    try {
        const addresses = await getDBAddresses(req.params.userId)
        res.status(200).json(addresses)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.get("/address/:addressId", async (req, res) => {
    try {
        const address = await getDBAddressByPk(req.params.addressId);
        res.status(200).json(address);
    } catch (error) {
        res.status(404).send(error.message);
    }
});
router.post('/:userId/addresses', async (req, res) => {
    try {
        const user = await getDBUserByPk(req.params.userId);
        const [address, createdAddress] = await dbCreateAddress(req.body, req.params.userId)
        if (createdAddress || !address.userId) {
            user.addAddress(address)
            res.status(200).send(`address ${req.body.address} created successfully`);
        } else {
            throw new Error('address already exists')
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
})
router.put('/addresses/:addressId', async (req, res) => {
    try {
        const updatedAddress = await dbUpdateAddress(req.body, req.params.addressId);
        res.status(200).send(updatedAddress)
    } catch (error) {
        res.status(404).send(error.message);
    }
})

router.delete('/addresses/:addressId', async (req, res) => {
    try {
        const deletedAddress = await dbDeleteAddress(req.params.addressId);
        res.status(200).send(deletedAddress)
    } catch (error) {
        res.status(404).send(error.message);
    }
})
module.exports = router