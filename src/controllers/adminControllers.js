const fs = require('fs');
const path = require('path');
let productos = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','product.json'),'utf-8'));

module.exports = {
    listar: (req,res) => {
        res.render('users/listarProducto')
    },
    crear : (req,res) => {
        res.render('users/agregarProducto')
    },
    store : (req,res) => {
        res.redirect('users/listarProducto')
    },
    editar : (req,res) => {
        res.render('users/listarProducto')
    },
    actualizar : (req,res) => {
        res.redirect('users/listarProducto')
    },
    eliminar : (req,res) => {
        
    },
}