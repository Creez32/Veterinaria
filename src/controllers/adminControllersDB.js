const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
let db = require('../database/models')

module.exports = {
    listar: (req,res) => {
        return res.render('admin/listarProductos')
    },
    crear : (req,res) => {

        let categories = db.Categories.findAll()
        let varieties = db.Varieties.findAll()

        Promise.all([categories,varieties])
        .then(([categories,varieties]) => {
            
            return res.render('admin/agregarProducto',{
            categories: categories,
            varieties,
            })
        })
        .catch((error) => res.send(error));
    },
    store: (req,res) => {
        let errors = validationResult(req)
        if (errors.isEmpty()) {
            const {name,brand,price,discount,edad,peso,stock,categoria,variedad,description} = req.body

            db.Products.create({
                name,
                brand,
                price: +price,
                discount: +discount,
                edad: +edad,
                peso : +peso,
                stock: +stock,
                categoria: +categoria,
                variedad: +variedad,
                description,
            })
            .then( product => {
                if(req.files.length != 0){
                    let images = req.files.map(image => {
                        let item = {
                            file: image.filename,
                            productsId : product.id
                        }
                        return item
                    })
                    db.Images.bulkCreate(images,{validate:true})
                    .then( () => {
                        return res.redirect('admin/listarProductos')
                        console.log('imagenes guardadas')
                    })
                }else{
                    db.Image.create(
                        {
                            file: 'default-image.jpg',
                            productsId: product.id
                        }
                    )
                    .then(() => res.redirect('admin/listarProductos'))
                }
            })
            .catch((error) => res.send(error));

        }else{
            let categories = db.Categories.findAll()
            let varieties = db.varieties.findAll()

            Promise.all([categories,varieties])

            .then(([categories,varieties]) => {
                return res.render('admin/agregarProductos',{
                    categories,
                    varieties,
                    old: req.body
                })
            })
            .catch((error) => res.send(error));
        }
    },
    editar : (req,res) => {
        let categories = db.Categories.findAll()
        let varieties = db.Varieties.findAll()

        Promise.all([categories,varieties])
        .then(([categories,varieties]) => {
            
            return res.render('admin/editarProductos',{
            categories: categories,
            varieties,
            })
        })
        .catch((error) => res.send(error));
    },
    actualizar : (req,res) => {
        const {nombre,precio,descripcion,variedad,categoria,edad,cantidadPeso,stock} = req.body


        productos.forEach(producto => {
            if(producto.id === +req.params.id){
                producto.nombre = nombre;
                producto.precio = +precio;
                producto.descripcion = descripcion;
                producto.variedad = variedad;
                producto.categoria = categoria;
                producto.edad = +edad;
                producto.cantidadPeso = +cantidadPeso;
                producto.imagen = req.file ? req.file.filename : "undefinedProduct.png",
                producto.stock = +stock;
            }
        });
        guardar(productos)
        return res.redirect('admin/listarProductos')
    },
    eliminar : (req,res) => {
        let productosModificados = productos.filter(producto => producto.id !== +req.params.id)
        guardar(productosModificados)
        return res.redirect('admin/listarProductos')
    },
        
}
