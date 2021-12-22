const fs = require('fs');
const path = require('path');
let db = require('../database/models')

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
			res.render("detail",{
				producto
			})
		})
		.catch(error => res.send(error))
    },
    cart: (req,res) => {
        res.render('cart')
    },
}