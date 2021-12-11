const fs = require('fs');
const path = require('path');

/* Bases de datos */
let db = require('../database/models')
const { Op } = require("sequelize");

module.exports = {
    index : (req, res) => {
        db.Products.findAll({
            include : [
                {all: true}
            ]
        })
        .then(productos => {
            res.render('index', {
                productos
            });
        })
        .catch((error) => res.send(error))
    },
    search: (req, res) => {

        let busqueda = req.query.busqueda.toLowerCase()
        db.Product.findAll({
            include: [{
                all: true
            }],
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.substring]: busqueda
                        }
                    },
                    {
                        description: {
                            [Op.substring]: busqueda
                        }
                    },
                    {
                        brand: {
                            [Op.substring]: busqueda
                        }
                    }
                ]
            }
        })
        .then(celulares => {
            return res.render('admin/resultsAdmin', {
                celulares,
                busqueda,
                toThousand
            })
        })
        .catch(error => console.log(error))
    }
}