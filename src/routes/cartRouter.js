var express = require('express');
var router = express.Router();

const {agregarItem,quitarItem,mostrarCarrito, vaciarCarrito} = require('../controllers/apiControllers/cartRest')

router.get('/agregar/:id',agregarItem);
router.get('/quitar/:id',quitarItem);
router.get('/listar',mostrarCarrito);
router.get('/vaciar',vaciarCarrito)

module.exports = router