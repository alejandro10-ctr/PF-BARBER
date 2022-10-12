const { Router, json } = require('express');
// import all routers;
const userMiddleware = require('../middlewares/users');


const router = Router();
router.use(json())
router.use('/users', userMiddleware);

module.exports = router;
