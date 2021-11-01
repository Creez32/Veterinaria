const fs = require('fs');
const path = require('path');
let productos = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','product.json'),'utf-8'));
const db = require('../database/models')

module.exports = {
    index : (req, res) => {
        db.Categories.findAll()
        .then(coso => {
            return res.send(coso)
        })
        .catch((error) => res.send(error))
    },

    search:(req, res) => {
        res.render('search', {
            title: 'Express' 
        });
    },
}