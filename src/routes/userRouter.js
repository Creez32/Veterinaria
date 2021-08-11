var express = require('express');
var router = express.Router();

let {login,register} = require('../controllers/userController');

/* GET home page. */
router.get('/login',login);

router.get('/register', register)

module.exports = router;
