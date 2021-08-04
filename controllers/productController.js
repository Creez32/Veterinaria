const fs = require('fs');
const path = require('path');
let productos = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','product.json'),'utf-8'));

module.exports = {
    products : (req,res) => {
        res.render('products',{
            productos
        })
    },
    detail : (req,res) => {
        res.render('detai')
    }
}