var express = require('express');
var router = express.Router();

const upload = require('../middlewares/multerProducts');

const {crear,store,listar,editar,actualizar,eliminar} = require('../controllers/adminControllersDB')

/* GET users listing. */
router.get('/',listar);

router.get('/create',crear)
router.post('/create', upload.array('imagen'),store)

router.get('/edit/:id', editar)
router.put('/edit/:id', actualizar)

router.delete('/eliminar/:id', eliminar)

module.exports = router;
