var express = require('express');
var router = express.Router();

const {crear,eliminar,listar,editar,store,actualizar} = require('../controllers/adminControllers')

/* GET users listing. */
router.get('/products',listar);

router.get('/products/create',crear)
router.post('/products',store)

router.get('/products/:id/edit', editar)
router.put('/products/:id', actualizar)

router.delete('/products/:id',eliminar)

module.exports = router;
