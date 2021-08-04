const express = require('express');
const router = express.Router();

const {products} = require('../controllers/productController')

router.get('/', products)
router.get('/cart',(req,res) => {
    res.send(cart)
})


module.exports = router