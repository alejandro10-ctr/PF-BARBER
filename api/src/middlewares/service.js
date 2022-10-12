const { Router } = require('express');
const { getDBServices } = require('../controllers/getAllServices.js')
const router = Router();

router.get('/', async (req, res) => {
    try {
        const allServices = await getDBServices()
        res.status(200).json(allServices)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})

module.exports = router;