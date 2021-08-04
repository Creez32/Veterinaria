var express = require('express');
var router = express.Router();

let {index} = require('../controllers/indexController');
const { detail } = require('../controllers/productController');

/* GET home page. */
router.get('/',index);
router.get('/detail/:id', detail)

module.exports = router;
