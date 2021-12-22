const db = require("../../database/models");
const { Op } = require('sequelize');

const throwError = (res, error) => {
    return res.status(error.status || 500).json({
        status: error.status || 500,
        errors: error.errors
    })
}

module.exports = {
    getProducts: async (req,res) => {
        console.log(req.query);
        let productos;
        let totalProductos;
        try {
            if(+req.query.filter !== 0){
                 productos = await db.Products.findAll({
                    where: {
                        categoryId: req.query.filter,
                    },
                    order: [req.query.order || 'id'],
                    include: [{
                        all: true
                    }]
                })
                totalProductos = await db.Products.count({
                    where: {
                        categoryId: req.query.filter,
                    }
                })
            }else {
                productos = await db.Products.findAll({
                    order: [
                        req.query.order || 'id'
                    ],
                    include: [{
                        all: true
                    }]
                })
                totalProductos = await db.Products.count()
            }
            let response = {
                status: 200,
                meta: {
                    total: totalProductos,
                    link: `${req.protocol}://${req.get('host')}${req.originalUrl}`
                },
                data: productos
            }
            return res.status(200).json(response)
        }catch (error) {
            console.log(error)
            throwError(res, error)
        }
    },
    getAllProducts: async (req, res) => {
        try {
            let products = await db.Products.findAll({
                include: [{
                    all: true
                }],
            })
            let response = {
                status: 200,
                meta: {
                    total: products.length,
                    link: `${req.protocol}://${req.get('host')}${req.originalUrl}`
                },
                data: products
            }
            return res.status(200).json(response)

        } catch (error) {
            throwError(res, error)
        }
    },
    getProductsByPrice: async (req, res) => {
        try {
            let products = await db.Product.findAll({
                include: [{
                    all: true
                }],
                order: [['price', 'ASC']]
            })
            let response = {
                status: 200,
                meta: {
                    total: products.length,
                    link: `${req.protocol}://${req.get('host')}${req.originalUrl}`
                },
                data: products
            }
            return res.status(200).json(response)

        } catch (error) {
            throwError(res, error)
        }
    },
}
