const { Router } = require('express');
const { getDBUsers} = require('../middlewares/getAllUsers')
const { getDBServices} = require('../middlewares/getAllServices')
const { getDBDays, dbCreateDay} = require('../middlewares/getAllDays.js')
const { getDBSchedules} = require('../middlewares/getAllSchedules.js')

const router = Router();
router.get('/', async (req, res) => {
    try {
        await getDBServices()
        const apiInfo = await getDBSchedules()
        res.status(200).json(apiInfo)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})
router.post('/', async (req,res) =>{
    try {
        await getDBServices()
        const createdDay = await dbCreateDay(req.body)
        res.status(200).send(createdDay)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})
module.exports = router;