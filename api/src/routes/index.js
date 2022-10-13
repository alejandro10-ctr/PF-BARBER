const { Router, json } = require('express');
// import all routers;
const userMiddleware = require('../controllers/users');
const serviceMiddleware = require('../controllers/service');
const scheduleMiddleware = require('../controllers/schedules');


const router = Router();
router.use(json())
router.use('/users', userMiddleware);
router.use('/services', serviceMiddleware);
router.use('/schedules',scheduleMiddleware)

module.exports = router;
