const { Router } = require('express');
const { getDBServiceByPk } = require('../middlewares/getAllServices')
const { getDBSchedules, dbUpdateSchedule, dbDeleteSchedule } = require('../middlewares/getAllSchedules.js')
const { dbCreateDay, dbUpdateDay, dbDeleteDay } = require('../middlewares/getAllDays.js')
const { dbUpdateHour, dbDeleteHour } = require('../middlewares/getAllHours.js')

const router = Router();
router.get('/', async (req, res) => {
    try {
        const allSchedules = await getDBSchedules()
        res.status(200).json(allSchedules)
    } catch (error) {
        res.status(404).send(error.message)
    }
})
router.post('/', async (req, res) => {
    try {
        const service = await getDBServiceByPk(req.body.serviceId)
        const createdDay = await dbCreateDay(req.body, service)
        res.status(200).send(createdDay)
    } catch (error) {
        res.status(404).send(error.message)
    }
})
router.put('/:serviceId', async (req, res) => {
    try {
        const service = await getDBServiceByPk(req.params.serviceId)
        const updatedSchedule = await dbUpdateSchedule(req.body, service)
        res.status(200).send(updatedSchedule)
    } catch (error) {
        res.status(404).send(error.message)
    }
})
router.delete('/:serviceId', async (req, res) => {
    try {
        const service = await getDBServiceByPk(req.params.serviceId)
        await dbDeleteSchedule(req.params.serviceId, service)
        res.status(200).send("deleted successfully")
    } catch (error) {
        res.status(404).send(error.message)
    }
})
router.put('/:serviceId/:code', async (req, res) => {
    try {
        const service = await getDBServiceByPk(req.params.serviceId)
        const updatedDay = await dbUpdateDay(req.body, req.params, service)
        res.status(200).send(updatedDay)
    } catch (error) {
        res.status(404).json(error.message)
    }
})
router.delete('/:serviceId/:code', async (req, res) => {
    try {
        const service = await getDBServiceByPk(req.params.serviceId)
        await dbDeleteDay(req.params.code, service)
        res.status(200).send("deleted successfully")
    } catch (error) {
        res.status(404).send(error.message)
    }
})
router.put('/:serviceId/:code/:hourId', async (req, res) => {
    try {
        const updatedHour = await dbUpdateHour(req.body, req.params)
        res.status(200).send(updatedHour)
    } catch (error) {
        res.status(404).json(error.message)
    }
})

router.delete('/:serviceId/:code/:hourId', async (req, res) => {
    try {
        await dbDeleteHour(req.params)
        res.status(200).send("deleted successfully")
    } catch (error) {
        res.status(404).send(error.message)
    }
})
module.exports = router;