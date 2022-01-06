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
                        return res.redirect('/admin')
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

            db.Products.findByPk( req.params.id, {
                include : [
                    {all: true}
                ]
            })
            .then( producto => {
                const {name,brand,price,discount,edad,peso,stock,categoria,variedad,description} = req.body

                let actualizado = db.Products.update({
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
                .then(() => {
                   
                    let colors
                    let imagen1
                    let imagen2
                    let imagen3
                    let imagen4

                    /* Imagen 1 */

                    /* Existe en la base de datos? */
                    if (producto.images[0].length !== 0) {
                        /* Viene una imagen nueva? */
                        if (!!req.files.imagen){

                            /* Guardo el nombre en una variable para despues borrarla */
                            imagen1 = producto.images[0].file

                            /* La remplazo en la base de datos */
                            db.Images.update({
                                file: req.files.imagen[0].filename,
                            },{
                                where: {id : producto.images[0].id}
                            })

                            /* Y borro la anterior */
                            if (fs.existsSync(path.join(__dirname, '../../public/images/products', imagen1))) {
                                fs.unlinkSync(path.join(__dirname, '../../public/images/products', imagen1))
                            }
                        }
                    }else{

                        /* Si no existe en la base de datos y me llega una imagen */
                        if (!!req.files.imagen){

                            /* La creo en la base de datos */
                            db.Images.create({
                                file: req.files.imagen[0].filename,
                                productsId: producto.id
                            })
                        }
                    }
                    /* Imagen 2 */
                    if (producto.images[1].length !== 0) {
                        if (!!req.files.imagen){

                            imagen2 = producto.images[1].file
                            db.Images.update({
                                file: req.files.imagen[1].filename,
                            },{
                                where: {id : producto.images[1].id}
                            })
                            if (fs.existsSync(path.join(__dirname, '../../public/images/products', imagen2))) {
                                fs.unlinkSync(path.join(__dirname, '../../public/images/products', imagen2))
                            }
                        }
                    }else{
                        if (!!req.files.imagen){
                            db.Images.create({
                                file: req.files.imagen[1].filename,
                                productsId: producto.id
                            })
                        }
                    }

                    /* Imagen 3 */
                    if (producto.images[2].length !== 0) {
                        if (!!req.files.imagen){
                            imagen3 = producto.images[2].file
                            db.Images.update({
                                file: req.files.imagen[2].filename,
                            },{
                                where: {id : producto.images[2].id}
                            })
                            if (fs.existsSync(path.join(__dirname, '../../public/images/products', imagen3))) {
                                fs.unlinkSync(path.join(__dirname, '../../public/images/products', imagen3))
                            }
                        }
                    }else{
                        if (!!req.files.imagen){
                            db.Images.create({
                                file: req.files.imagen[2].filename,
                                productsId: producto.id
                            })
                        }
                    }
                    
                    /* Imagen 4 */
                    if (producto.images[3].length !== 0) {
                        if (!!req.files.imagen){
                            imagen4 = producto.images[3].file
                            db.Images.update({
                                file: req.files.imagen[3].filename,
                            },{
                                where: {id : producto.images[3].id}
                            })
                            if (fs.existsSync(path.join(__dirname, '../../public/images/products', imagen4))) {
                                fs.unlinkSync(path.join(__dirname, '../../public/images/products', imagen4))
                            }
                        }
                    }else{
                        if (!!req.files.imagen){
                            db.Images.create({
                                file: req.files.imagen[3].filename,
                                productsId: producto.id
                            })
                        }
                    }
                    /* Colores */

                    
                    if(req.body.color){
                        colors = req.body.color.map(e => {
                            let colores = {
                                nombre: e,
                                productsId : product.id
                            }
                            return colores
                        })
                    }

                    /* Elimino todos los colores de la base de
                     datos que contengan el ID del producto */

                    db.Colors.destroy({
                        where:{
                            productsId: producto.id
                        }
                    })

                    /* E inserto todos aquellos que esten llegando por body*/
                    db.Colors.bulkCreate(colors,{validate:true})

                })
            }).catch((error) => res.send(error));

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
