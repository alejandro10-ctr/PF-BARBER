const { Router, json } = require('express');
// import all routers;
const userController = require('../controllers/users');
const serviceController = require('../controllers/service');
const scheduleController = require('../controllers/schedules');


const router = Router();
router.use(json())
router.use('/users', userController);
router.use('/services', serviceController);
router.use('/schedules',scheduleController)

module.exports = router;
