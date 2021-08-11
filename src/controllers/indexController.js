const fs = require('fs');
const path = require('path');
let productos = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','product.json'),'utf-8'));

module.exports = {
    index : (req, res) => {
        res.render('index', {
             title: 'Express' 
            });
    },

    search:(req, res) => {
        res.render('search', {
            title: 'Express' 
        });
    },
}