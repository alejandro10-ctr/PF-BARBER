const { Router } = require('express');
const { getDBServices, getDBServiceByPk, getDBServiceCreate } = require('../middlewares/getAllServices.js')
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
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const service = await getDBServiceByPk(id)
        res.status(200).json(service)
    } catch (error) {
        console.log(error)
        res.status(404).send('service not found')
    }
})

router.post('/', async (req, res) => {
    try {
        const serviceCreated = await getDBServiceCreate(req.body)
        res.status(200).json(serviceCreated)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})

module.exports = router;