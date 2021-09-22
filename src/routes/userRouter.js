var express = require('express');
var router = express.Router();

let loginValidator = require('../validations/loginValidator')
let registerValidator = require('../validations/registerValidator')

let {login,register, processLogin, processRegister} = require('../controllers/userController');

/* GET home page. */
router.get('/login',login);
router.post('/login',loginValidator,processLogin)

router.get('/register', register)
router.post('/register',registerValidator,processRegister)

module.exports = router;
