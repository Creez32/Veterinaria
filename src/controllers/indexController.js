const fs = require('fs');
const path = require('path');

/* Bases de datos */
let db = require('../database/models')
const { Op, where } = require("sequelize");

module.exports = {
    index : (req, res) => {
        db.Products.findAll({
            include : [
                {all: true}
            ]
        })
        .then(productos => {

            !req.session.carrito ? req.session.carrito = [] : null
            
            res.render('index', {
                productos,
                defaultImage : 'undefinedProduct.png'
            });
        })
        .catch((error) => res.send(error))
    },
    search: (req, res) => {

        let busqueda = req.query.busqueda.toLowerCase()
        let categories = db.Categories.findAll()
        let productos = db.Products.findAll({
            include: [{
                all: true
            }],
            where: {
                [Op.or]: [
                    { name: { [Op.substring]: `%${busqueda}%` } },
                    { brand: { [Op.substring]: `%${busqueda}%` } },
                ],
            }
        })
        Promise.all([categories,productos])
        .then(([categories,productos]) => {

            return res.render('search', {
                productos,
                categories
            })
        })
        .catch(error => console.log(error))
    }
}