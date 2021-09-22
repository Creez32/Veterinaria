const {check} = require('express-validator')

module.exports = [
    check('email').isEmail().withMessage('Debes ingresar un email valido'),

    check('pass').notEmpty().withMessage('Debes ingresar tu contraseña')
]