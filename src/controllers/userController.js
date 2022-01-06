const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const db = require("../database/models");

module.exports = {
  register: (req, res) => {
    return res.render("users/register");
  },
  processRegister: (req, res) => {
    let errores = validationResult(req);

    if (errores.isEmpty()) {
      const { nombre, apellido, email, pass } = req.body;
      let img = req.files[0].filename;

      db.Users.create({
        name: nombre.trim(),
        lastName: apellido.trim(),
        email: email.trim().tolowercase(),
        password: bcryptjs.hashSync(pass.trim(), 10),
        rolId: 2,
        avatar: img ? img : "imagenDefault.jpg",
      })
        .then((usuario) => {
          req.session.userLogin = {
            id: usuario.id,
            nombre: usuario.name,
            rol: usuario.rolId,
            avatar: usuario.avatar,
          };
          return res.redirect("/");
        })
        .catch((error) => console.log(error));
    } else {
      return res.render("user/register", {
        errores: errores.mapped(),
        old: req.body,
      });
    }
    res.redirect("/user");
  },
  login: (req, res) => {
    return res.render("users/login");
  },
  processLogin: (req, res) => {
    let errores = validationResult(req);
        if(errores.isEmpty()){
            const {email, pass, recordar} = req.body;

            db.User.findOne({
                where : {
                    email
                }
            })

            .then(user => {
                if(user && bcrypt.compareSync(pass, user.pass)){

                    req.session.userLogin = {
                        id : user.id,
                        name : user.name,
                        email : user.email,
                        rol : user.rol,
                        avatar : user.avatar
                    }

                    if(recordar){
                        res.cookie('Veterinaria',req.session.userLogin, {
                            maxAge : 1000 * 60
                        })
                    }

                    if(req.session.carrito.length != 0){

                        db.Order.findOne({
                            where : {
                                userId : req.session.userLogin.id,
                                status : 'pending'
                            },
                            include : [
                                {
                                    association : 'carrito',
                                    include : [
                                        {
                                            association : 'producto',
                                            include : [
                                                {association : 'imagenes'}
                                            ]
                                        }
                                    ]
                                }
                            ]
                        })
                        .then(orden => {
                            if(orden) {
                                let carritoNew = req.session.carrito;
                                req.session.carrito = [];
                                orden.carrito.forEach(item => {
                                    let producto = {
                                        id : item.producto.id,
                                        nombre : item.producto.nombre,
                                        imagen : item.producto.imagenes[0].link,
                                        precio : item.producto.precio,
                                        cantidad : +item.cantidad,
                                        total : +item.producto.precio * +item.cantidad,
                                        ordenId : orden.id
                                    }
                                    req.session.carrito.push(producto)
                                });
                                req.session.carrito = [
                                    ...req.session.carrito,
                                    ...carritoNew
                                ]
                                return res.redirect('/')

                            }else {
                                db.Order.create({
                                    userId : req.session.userLogin.id,
                                    status : 'pending'
                                })
                                .then(orden => {
                                    console.log('------->>>>> orden creada!!!')
                                    req.session.carrito.forEach(item => {
                                        item.orderId = orden.id

                                        db.Cart.create({
                                            userId : orden.userId,
                                            productId : item.id,
                                            cantidad : item.cantidad,
                                            orderId : orden.id
                                        })
                                    })
                                    return res.redirect('/')

                                })
                            }
                        })
                    }else{
                        db.Order.findOne({
                            where : {
                                userId : req.session.userLogin.id,
                                status : 'pending'
                            },
                            include : [
                                {
                                    association : 'carrito',
                                    include : [
                                        {
                                            association : 'producto',
                                            include : [
                                                {association : 'imagenes'}
                                            ]
                                        }
                                    ]
                                }
                            ]
                        })
                        .then(orden =>{
                            if(orden){
                                orden.carrito.forEach(item => {
                                    let producto = {
                                        id : item.producto.id,
                                        nombre : item.producto.nombre,
                                        imagen : item.producto.imagenes[0].link,
                                        precio : item.producto.precio,
                                        cantidad : +item.cantidad,
                                        total : item.producto.precio * item.cantidad,
                                        orderId : orden.id
                                    }
                                    req.session.carrito.push(producto)                  
                                })
                                console.log(req.session.carrito)
                                return res.redirect('/')
                            }
                            return res.redirect('/')
                           
                        })
                        .catch(error => console.log(error))
                    }

                }else {
                    return res.render('login',{
                        errores :{
                            invalid : {
                                msg : "Credenciales inválidas"
                            }
                        }
                    })
                }
            })
        }else{
            return res.render('login',{
                errores : errores.mapped(),
                old : req.body
            })
        }
    },
    logout : (req,res) => {
      req.session.destroy();
      if(req.cookies.Veterinaria){
          res.cookie('Veterinaria','', {maxAge : -1})
      }
      return res.redirect('/')
  },
  profile: (req, res) => {
    return res.render("users/profile");
  },
  editProfile: (req, res) => {
    return res.render("users/editProfile");
  },
  pass: (req, res) => {
    return res.render("users/pass");
  },
};
