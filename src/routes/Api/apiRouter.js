const express = require('express');
const router = express.Router();

const { getAllProducts,getProducts } = require('../../controllers/apiControllers/productsRest')

router.get('/products-all', getAllProducts);
router.get('/products', getProducts);
router.get('/listar')

module.exports = router