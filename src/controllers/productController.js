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
        let id = +req.params.id
        let producto = productos.find(producto => producto.id === id)

        res.render('detail',{
            producto
        })
    },
    cart: (req,res) => {
        res.render('cart')
    },
}