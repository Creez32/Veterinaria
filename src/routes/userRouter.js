var express = require('express');
var router = express.Router();

let loginValidator = require('../validations/loginValidator')
let registerValidator = require('../validations/registerValidator')

let {login,register, processLogin, processRegister,profile,editProfile,pass} = require('../controllers/userController');

/* GET home page. */
router.get('/login',login);
router.post('/login',loginValidator,processLogin)

router.get('/register', register)
router.post('/register',registerValidator,processRegister)

router.get('/profile', profile)
router.put('/profile/:id', editProfile)


router.get('/profile/password/:id', pass)

module.exports = router;
