var express = require('express');
var router = express.Router();

const upload = require('../middlewares/multerProducts');

const {crear,store,listar,editar,actualizar,eliminar} = require('../controllers/adminControllers')

/* GET users listing. */
router.get('/',listar);

router.get('/create',crear)
router.post('/create', upload.array('imagen'),store)

router.get('/edit/:id', editar)


/* router.put('/edit/:id',upload.any('imagen'), actualizar) */

router.put('/edit/:id',upload.fields([
    { name: 'imagen', maxCount: 1},
    { name: 'imagen2', maxCount: 1},
    { name: 'imagen3', maxCount: 1},
    { name: 'imagen4', maxCount: 1}
   ]), actualizar)

/* router.put('/edit/:id',upload.array('imagen'), actualizar) */

router.delete('/eliminar/:id', eliminar)    

module.exports = router;
