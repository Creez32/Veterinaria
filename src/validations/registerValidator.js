const {body,check} = require('express-validator');
const bcryptjs = require('bcryptjs');
const db = require('../database/models')

module.exports=[ 
    check("name")
    .notEmpty()
    .withMessage("*Debes ingresar un nombre"),

    check("lastName")
     .notEmpty()
    .withMessage("*Debes ingresar un apellido"),

    check('email')
    .isEmail()
    .withMessage('*Debes ingresar un email válido'),

     check('password')
    .isLength({
     min:8, 
    })
    .withMessage('*Tu contraseña debe tener un minimo de 8 caracteres'),

    body('password2')
    .custom((value,{req}) => {
        if(value !== req.body.password){
            return false
        }
        return true
    }).withMessage('La verificación de la contraseña no coincide'),

    check('terms')
    .isString('on').withMessage('Debes aceptar los términos y condiciones'),

    

    body('email')
    .custom( value => {
       
        return db.Users.findOne({
            where : {
                email : value
            }
        })
            .then(users => {
                if(users){
                    return Promise.reject('El email ya se encuentra registrado')
                }
            })
    })
        
]
