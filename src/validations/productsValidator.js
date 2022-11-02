const {body} = require('express-validator');

module.exports = [
    body('name')
    .notEmpty().withMessage('El nombre es obligatorio'),

    body('price')
    .notEmpty().withMessage('El precio es obigatorio'),
    
    body('description')
    .isLength({
        min : 10
    }).withMessage('La descripción debe tener como mínimo 10 caracteres'),

    body('category')
    .notEmpty()
    .withMessage('Indica la categoría'),

    body('discount')
    .notEmpty().withMessage('Debe poner un número'),

    body('images')
    .custom((value,{req}) => {
      
        if(req.file){
            return true
        }else{
            return false
        }
    })
    .withMessage('No ha subido una imágen')
    
]