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
        .then(products => {
            return res.render('admin/listarProductos',{
                products
            })
        })
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
                    categoryId: +categoria,
                    varietyId: +variedad,
                    description,
                })

            .then(product => {

                
                let images
                let colors 

                if (!!req.files) {
                    images = req.files.map(image => {
                        let item = {
                            file: image.filename,
                            productsId : product.id
                        }
                        return item
                    })
                }

                if(req.body.color){
                    colors = req.body.color.map(e => {
                        let colores = {
                            nombre: e,
                            productsId : product.id
                        }
                        return colores
                    })
                }

                if (req.files.length !== 0 && !!req.body.color){

                    console.log("<------- Con Colores e Imagenes ---------->");

                    db.Images.bulkCreate(images,{validate:true})
                    db.Colors.bulkCreate(colors,{validate:true})

                    .then(() =>{
                        res.redirect('/admin')
                    })
                    
                }else if( !!req.files && !req.body.color){
                    
                    console.log("<------- Con Imagenes Solamente ---------->");
                    
                    db.Images.bulkCreate(images,{validate:true})
                    
                    .then(() =>{
                        res.redirect('/admin')
                    })

                }else if(req.files.length === 0 && !!req.body.color){

                    console.log("<-------  Solamente Con Colores ---------->");

                    db.Colors.bulkCreate(colors,{validate:true})
                    db.Images.create({
                        nombre: "undefinedProduct.png",
                        productsId : product.id
                    })

                    .then(() =>{
                        res.redirect('/admin')
                    })
                    
                }else{

                    console.log("<------- Sin Ninguno ---------->");

                    db.Images.create({
                        nombre: "undefinedProduct.png",
                        productsId : product.id
                    })
                    .then(() =>{
                        res.redirect('/admin')
                    })

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

        let producto = db.Products.findByPk(req.params.id,{
            include: [{
                all: true
            }]
        })

        

        Promise.all([categories,varieties,producto])
        .then(([categories,varieties,producto]) => {
            let defaultImage = 'undefinedProduct.png'
            return res.render('admin/editarProductos',{
                producto,
                categories: categories,
                varieties,
                defaultImage
            })
        })
        .catch((error) => res.send(error));

    },
    actualizar : (req,res) => {

        let errors = validationResult(req)

        if (errors.isEmpty()){

            const {name,brand,price,discount,edad,peso,stock,categoria,variedad,description} = req.body

            let producto = db.Products.update({
                name,
                brand,
                price: +price,
                discount: +discount,
                edad: +edad,
                peso : +peso,
                stock: +stock,
                categoryId: +categoria,
                varietyId: +variedad,
                description,

            },
            {
                where: { id : req.params.id }
            })

            let imagenes = db.Images.findAll({
                where :{
                    productsId : req.params.id
                }
            })
            Promise.all([producto,imagenes])

            .then(([producto,imagenes]) => {

                    

                    let algo = {
                        body: req.body,
                        images: req.files,
                        imagesDB : imagenes,
                        imagenesPush : () => {
                            let imagenes = req.files.map((imagen, index) => {
                                let item = {
                                    file: imagesDB[index] ? imagesDB[index].file : imagen.filename,
                                    productsId : producto.id
                                }
                                return item
                            })
                            return imagenes
                        },
                        arrayDeImagenes : this.imagenesPush()
                    }
                    return res.send(algo)
                

            if(req.files.length != 0){

                let images
                let colors 

                if (!req.files) {
                    images = req.files.map(image => {
                        let item = {
                            file: image.filename,
                            productsId : product.id
                        }
                        return item
                    })
                }

                if(!req.body.colors){
                    colors = req.body.color.map(e => {
                        let colores = {
                            nombre: e,
                            productsId : product.id
                        }
                        return colores
                    })
                }

                db.Images.bulkCreate(images,{validate:true})
                db.Colors.bulkCreate(colors,{validate:true})

                .then(() => {
                    return res.redirect('/admin')
                })
            }
        })
        .catch((error) => res.send(error));

        }else{
        let categories = db.Categories.findAll()
        let varieties = db.Varieties.findAll()
        let producto = db.Products.findByPk(req.params.id,{
            include: [{
                all: true
            }]
        })

        Promise.all([categories,varieties,producto])
        .then(([categories,varieties,producto]) => {
            let defaultImage = 'undefinedProduct.png'
            return res.render('admin/editarProductos',{
                producto,
                categories: categories,
                varieties,
                defaultImage
            })
        })
        .catch((error) => res.send(error));
        }
    },
    eliminar : (req,res) => {

        db.Products.findByPk(req.params.id, {
            include: [{
                all: true
            }],
        })
        .then(product => {
            if(product.images.length !== 0){
                product.images.forEach(item => {
                    if (fs.existsSync(path.join(__dirname, '../../public/images/products', item.file))) {
                        fs.unlinkSync(path.join(__dirname, '../../public/images/products', item.file))
                    }
                });
            }else if (product.images[0] === 'undefinedProduct.png') {
                console.log('Imagen por defecto');
            } else {
                console.log('Producto sin Imagen');
            }
            
            db.Products.destroy({
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
