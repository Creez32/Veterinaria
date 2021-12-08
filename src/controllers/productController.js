const fs = require('fs');
const path = require('path');
let db = require('../database/models')

module.exports = {
    products : (req,res) => {
        db.Products.findAll({
            include : {association:'images'}
        })
        .then(productos => {
            return res.render('products', {
                title: 'Express',
                productos
            });
        })
        .catch((error) => res.send(error))
    },
    detail : (req,res) => {
        let product = db.Product.findByPk(req.params.id,{
			include :[
				{association : "images"},
				{association : "categories"},
                {association : "color"},
				{association : "varieties"}
			]
		})
		.then((product) =>{
			let categoria = db.Categories.findOne({
				where : {
					id : product.categoryId
				},
			})
            let varieties = db.Categories.findOne({
				where : {
					id : product.varietyId
				},
			})
            let images = db.images.findAll({
				where : {
					productsId : product.id
				},
			})
            let colors = db.Color.findAll({
				where : {
					productsId : product.id
				},
			})
            Promise.all([categoria,varieties,images,colors])
			.then(([categoria,varieties,images,colors]) =>{
				res.render("productDetail",{
					product,
                    categoria,
                    varieties,
                    images,
                    colors
                })
			})
			.catch(error => res.send(error))
		})
		.catch(error => res.send(error))
    },
    cart: (req,res) => {
        res.render('cart')
    },
}