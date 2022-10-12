const { Router, json } = require('express');
// import all routers;
const userMiddleware = require('../middlewares/users');
const serviceMiddleware = require('../middlewares/service');
const scheduleMiddleware = require('../middlewares/schedule');


const router = Router();
router.use(json())
router.use('/users', userMiddleware);
router.use('/services', serviceMiddleware);
router.use('/schedules',scheduleMiddleware)

module.exports = router;
