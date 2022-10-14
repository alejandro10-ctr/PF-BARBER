const {Router} = require('express')
const {User} = require('../db.js')
const {singUp, singIn} = require('../middlewares/auth')

const router = Router();

router.post('/register', singUp)
router.post('/login', singIn)

module.exports = router;
