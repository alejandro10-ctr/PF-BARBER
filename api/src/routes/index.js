const { Router, json } = require('express');
// import all routers;
const userMiddleware = require('../middlewares/users');
const serviceMiddleware = require('../middlewares/service');


const router = Router();
router.use(json())
router.use('/users', userMiddleware);
router.use('/services', serviceMiddleware);

module.exports = router;
