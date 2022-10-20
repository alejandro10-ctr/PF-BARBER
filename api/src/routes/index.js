const { Router, json } = require('express');
// import all routers;
//--------------> Users
const authController = require('../controllers/auth')
const userController = require('../controllers/users');
//--------------> Sales
const saleController = require('../controllers/sale')
const detailSaleController = require('../controllers/DetatilSale')
//--------------> Services
const serviceController = require('../controllers/service');
const scheduleController = require('../controllers/schedules');
//--------------> Products
const productController = require('../controllers/product')
const imageController = require('../controllers/image')



const router = Router();
router.use(json())

router.use('/auth', authController)
router.use('/users', userController);

router.use('/sales', saleController)
router.use('/detailsales', detailSaleController);

router.use('/services', serviceController);
router.use('/schedules',scheduleController)

router.use('/products', productController)
router.use('/images', imageController)

module.exports = router;
