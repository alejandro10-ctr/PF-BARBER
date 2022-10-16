const { Router } = require('express');
const serviceController = require('../controllers/scheduleService')
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
router.use('/services',serviceController)
module.exports = router;