const { Router, json } = require('express');
// import all routers;
const userController = require('../controllers/users');
const serviceController = require('../controllers/service');
const scheduleController = require('../controllers/schedules');
const productController = require('../controllers/product')
const authController = require('../controllers/auth')


const router = Router();
router.use(json())
router.use('/users', userController);
router.use('/services', serviceController);
router.use('/schedules',scheduleController)
router.use('/products', productController)
router.use('/auth', authController)

module.exports = router;
