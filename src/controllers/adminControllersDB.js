const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
let db = require('../database/models')

module.exports = {
    listar: (req,res) => {
        db.Products.findAll({
            include: [{
                all: true
            }]
        })
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
                    brand: brand,
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

        const {name,brand,price,discount,edad,peso,stock,categoria,variedad,description} = req.body

        db.Products.update({
            name,
            brand: brand,
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
                })
            }
        })
        .catch((error) => res.send(error));
    },
    eliminar : (req,res) => {
        db.Product.findByPk(req.params.id, {
            include: [{
                all: true
            }],
        })
        .then(product => {
            product.images.forEach(item => {
                if (fs.existsSync(path.join(__dirname, '../../public/images/products', item.file))) {
                    fs.unlinkSync(path.join(__dirname, '../../public/images/products', item.file))
                }
            });
            db.Product.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(() => {
                return res.redirect('/admin')
            })
            
        })  
        .catch(error => console.log(error))
    },
        
}
