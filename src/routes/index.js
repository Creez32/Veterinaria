var express = require('express');
var router = express.Router();

let {index,search, contacto} = require('../controllers/indexController');

/* GET home page. */
router.get('/',index);
router.get('/search',search)
router.get('/contact',contacto)

module.exports = router;
