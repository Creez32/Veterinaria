const fs = require('fs');
const path = require('path');
let db = require('../database/models')

module.exports = {
    index : (req, res) => {

        db.Products.findAll({
            include : [
                {association:'images'}
            ]
        })
        .then(productos => {
            res.render('index', {
                productos
            });
        })
        .catch((error) => res.send(error))
    },

    search:(req, res) => {
        res.render('search', {
            title: 'Express' 
        });
    },
}