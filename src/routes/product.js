const express = require('express');
const router = express.Router();

const {products, cart, detail} = require('../controllers/productController')

router.get('/', products)
router.get('/cart',cart)
router.get('/detail/:id',detail)


module.exports = router