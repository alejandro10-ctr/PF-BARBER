const { Router } = require('express');
const { getDBUsers, getDBUserByPk } = require('../controllers/getAllUsers.js')

const router = Router();

router.get('/', async (req, res) => {
    try {
        const apiInfo = await getDBUsers()
        res.status(200).json(apiInfo)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})
router.get('/:id',async (req, res) => {
    try {
        const {id} = req.params
        await getDBUsers()
        const user = await getDBUserByPk(id)
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})
module.exports = router;