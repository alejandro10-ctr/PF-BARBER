const { Router } = require('express');
const { getDBServiceByPk } = require('../middlewares/getAllServices')
const { dbCreateDay, dbUpdateDay } = require('../middlewares/getAllDays.js')
const { getDBSchedules, dbUpdateSchedule } = require('../middlewares/getAllSchedules.js')

const router = Router();
router.get('/', async (req, res) => {
    try {
        const allSchedules = await getDBSchedules()
        res.status(200).json(allSchedules)
    } catch (error) {
        res.status(404).send(error)
    }
})
router.post('/', async (req, res) => {
    try {
        const service = await getDBServiceByPk(req.body.serviceId)
        const createdDay = await dbCreateDay(req.body, service)
        res.status(200).send(createdDay)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})
router.put('/:id/schedule', async (req, res) => {
    try {
        const service = await getDBServiceByPk(req.params.id)
        const updatedSchedule = await dbUpdateSchedule(req.body, service)
        res.status(200).send(updatedSchedule)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})
router.put('/:id/schedule/:day', async (req, res) => {
    try {
        const service = await getDBServiceByPk(req.params.id)
        const updatedDay = await dbUpdateDay(req.body,req.params.day, service)
        res.status(200).send(updatedDay)
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
})
module.exports = router;