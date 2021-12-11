const db = require("../database/models");

const throwError = (res, error) => {
    return res.status(error.status || 500).json({
        status: error.status || 500,
        errors: error.errors
    })
}

module.exports = {
    getAllProduct: async (req, res) => {
        try {
            let products = await db.Product.findAll({
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
}
