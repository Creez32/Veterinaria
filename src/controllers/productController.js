const fs = require('fs');
const path = require('path');
let db = require('../database/models')
let Sequelize = require('sequelize')

module.exports = {
    products : (req,res) => {
        let categories = db.Categories.findAll()
        let productos = db.Products.findAll({
            include : {association:'images'}
        })
        Promise.all([categories,productos])
        .then(([categories,productos]) => {

            

            return res.render('products', {
                title: 'Express',
                productos,
                categories
            });
        })
        .catch((error) => res.send(error))
    },
    detail : (req,res) => {
        db.Products.findByPk( req.params.id, {
            include : [
                {all: true}
            ]
        })
		.then(producto =>{
            
            /* Productos Aleatorios por Categoria */
            db.Categories.findAll({
                where: {
                    id: producto.categoryId
                },
                include: [
                    {
                        association:'product',
                        order: [[Sequelize.literal("RAND()")]],
                        limit: 4,
                        include:[
                            {all:true}
                        ]
                    }
                ],
                
            })
            .then(aleatorio =>{
                /* return res.send(aleatorio[0].product) */
			    res.render("detail",{
                    producto,
                    aleatorio: aleatorio[0].product
			    })
            })
		})
		.catch(error => res.send(error))
    },
    cart: (req,res) => {
        res.render('cart')
    },
}