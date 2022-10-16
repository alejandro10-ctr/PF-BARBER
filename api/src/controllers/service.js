const { Router } = require('express');
const { getDBServices, getDBServiceByPk, dbDBServiceCreate, dbUpdateService, dbDeleteService } = require('../middlewares/getAllServices.js')

const { dbDeleteSchedule } = require('../middlewares/getAllSchedules.js')
const router = Router();

router.get('/', async (req, res) => {
    try {
        const allServices = await getDBServices()
        res.status(200).json(allServices)
    } catch (error) {
        res.status(404).send(error.message)
    }
})
router.get('/:serviceId', async (req, res) => {
    try {
        const { serviceId } = req.params
        const service = await getDBServiceByPk(serviceId)
        res.status(200).json(service)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.post('/', async (req, res) => {
    try {
        const serviceCreated = await dbDBServiceCreate(req.body)
        res.status(200).json(serviceCreated)
    } catch (error) {
        res.status(404).send(error.message)
    }
})
router.put('/:serviceId', async (req, res) => {
    try {
        const createdService = await dbUpdateService(req.body, req.params.serviceId)
        res.status(200).send(createdService)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.delete('/:serviceId', async (req, res) => {
    try {
        
        const service = await getDBServiceByPk(req.params.serviceId)
        if(service.scheduleId) await dbDeleteSchedule(req.params.serviceId, service)
        const deletedService = await dbDeleteService(req.params.serviceId)

        res.status(200).send(deletedService)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

module.exports = router;