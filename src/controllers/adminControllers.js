const fs = require('fs');
const path = require('path');
let productos = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','product.json'),'utf-8'));
let guardar = (dato) => fs.writeFileSync(path.join(__dirname,'..','data','product.json'),JSON.stringify(dato,null,2),'utf-8')

module.exports = {
    listar: (req,res) => {
        return res.render('admin/listarProducto',{
            productos
        })
    },
    crear : (req,res) => {
        return res.render('admin/agregarProducto')
    },
    store : (req,res) => {
        const {nombre,precio,descripcion,variedad,categoria,edad,cantidadPeso,stock} = req.body

        if(nombre.trim() != "" && precio != ""){
            let producto = {
                id: productos[productos.length - 1].id + 1,
                nombre : nombre.trim(),
                precio : +precio,
                descripcion,
                variedad,
                categoria,
                edad : +edad,
                cantidadPeso : +cantidadPeso,
                imagen : req.file ? req.file.filename : "undefinedProduct.png",
                stock : +stock
            }
            productos.push(producto)
            guardar(productos)
            return res.redirect('admin/listarProductos')
        }
        res.redirect('admin/agregarProducto')
    },
    editar : (req,res) => {
        let id = +req.params.id
        let producto = productos.find(producto => producto.id === id)
        res.render('admin/editarProducto',{
            producto
        })
    },
    actualizar : (req,res) => {
        const {nombre,precio,descripcion,variedad,categoria,edad,cantidadPeso,stock} = req.body


        productos.forEach(producto => {
            if(producto.id === +req.params.id){
                producto.nombre = nombre;
                producto.precio = +precio;
                producto.descripcion = descripcion;
                producto.variedad = variedad;
                producto.categoria = categoria;
                producto.edad = +edad;
                producto.cantidadPeso = +cantidadPeso;
                producto.imagen = req.file ? req.file.filename : "undefinedProduct.png",
                producto.stock = +stock;
            }
        });
        guardar(productos)
        return res.redirect('admin/listarProducto')
    },
    eliminar : (req,res) => {
        let productosModificados = productos.filter(producto => producto.id !== +req.params.id)
        guardar(productosModificados)
        return res.redirect('admin/listarProducto')
    },
}