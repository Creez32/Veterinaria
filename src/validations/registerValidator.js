const {check} = require('express-validator')

module.exports = [
    check('nombre').notEmpty().withMessage('Debes ingresar un Nombre'),

    check('apellido').notEmpty().withMessage('Debes ingresar un Apellido'),

    check('email').isEmail().withMessage('Debes ingresar un email valido'),

    check('pass').notEmpty().withMessage('Debes ingresar tu contraseña'),

    check('pass2').notEmpty().withMessage('Debes ingresar tu contraseña'),
]