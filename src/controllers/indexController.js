const fs = require('fs');
const path = require('path');
let productos = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','product.json'),'utf-8'));
let db = require('../database/models')

module.exports = {
    index : (req, res) => {

        db.Products.findAll({
            include : ['category','variety','images','colors']
        })
        .then(productos => {
            res.render('index', {
                title: 'Express',
                productos,
                color: 'Rojo'
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