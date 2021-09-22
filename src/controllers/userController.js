const fs = require('fs')
const path = require('path')

const usuarios = JSON.parse(fs.readFileSync(path.join(__dirname,"..","data","users.json"),"utf-8"));


module.exports = {
    register: (req,res) =>{
        return res.render('users/register')
    },
    processRegister : (req,res)=> {
        let errores = validationResult(req)
        if(errores.isEmpty()){
            const {nombre,apellido,email,pass,fecha} = req.body
            let img = req.files[0].filename;
            
            hash = bcrypt.hashSync(pass,12)

            usuario = {
                id :usuarios[usuarios.length-1] ? usuarios[usuarios.length-1].id + 1 :  1,
                nombre,
                apellido,
                email,
                pass: hash,
                fecha,
                img
            }

            usuarios.push(usuario)

            fs.writeFileSync(path.join(__dirname,'..','data','users.json'),JSON.stringify(usuarios,null,2),'utf-8');


        }else{
            return res.render('user/register',{
                errores : errores.mapped(),
                old:req.body
            })
        }
        res.redirect('/user')
    },
    login : (req,res)=> {
        return res.render('users/login')
    },
    processLogin : (req,res)=> {
        let errors = validationResult(req);

        if(errors.isEmpty()){
            const {email} = req.body;
            let usuario = usuarios.find(usuario => usuario.email === email);
            req.session.userLogin = {
                id : usuario.id,
                nombre : usuario.nombre,
                rol : usuario.rol
            }
            if (recordar) {
                res.cookie('Veterinaria', req.session.user, {
                    maxAge: 1000 * 60 * 60 * 24 * 100000
                })
            }
            return res.redirect('/users/profile')
        }else{
            return res.render('users/login',{
                errores : errors.mapped(),
                old:req.body
            })
        }
       
    },
}