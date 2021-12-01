const {body} = require('express-validator');
const db =require('../database/models');
const bcryptjs = require('bcryptjs');


module.exports = [
    body('email')
    .custom((value,{req}) => {
        return db.Users.findOne({
            where : {
                email : value,
            }
        })
            .then(user => {
                if(!user || !bcryptjs.compareSync(req.body.pass, user.password)){
                    return Promise.reject()
                }
            }).catch( () => Promise.reject('email y/o contraseña incorrectas'))
    })
] 
