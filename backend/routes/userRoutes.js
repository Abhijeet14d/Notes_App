const express = require('express');
const router = express.Router();
const { register, login, getUser } = require('../controllers/userController');
const { generateAccessToken } = require('../utils/jwt');


router.post('/register', register);
router.post('/login', login);
router.get('/getuser', generateAccessToken ,getUser);

module.exports = router;