const db = require('../database/models');

const verificar =  (carrito, id) => {
    let pos = -1;
    for (let i = 0; i < carrito.length; i++) {
        
        if(carrito[i].id == id){
            pos = i
            break
        }
    }
    return pos
}

module.exports = {
    agregarItem : (req,res) => {
        let carrito = req.session.carrito;
        let id = req.params.id;

        db.Products.findOne({
            where : {
                id
            },
            include : [
                {all:true}
            ]
        })
        .then(producto => {

            let pos = verificar(carrito,id)

            if(pos == -1) {
                let item = {
                    id : producto.id,
                    nombre : producto.name,
                    imagen : producto.images[0].file,
                    precio : producto.price,
                    total : producto.precio,
                    cantidad : 1
                };
                carrito.push(item)

                if(req.session.userLogin){
                    db.Order.findOne({
                        where : {
                            userId : req.session.userLogin.id,
                            status : 'pending'
                        }
                    })
                    .then(order => {
                        if(order){
                            db.Cart.create({
                                userId : order.userId,
                                productId : producto.id,
                                cantidad : 1,
                                orderId : order.id
                            })
                        }else{
                            db.Order.create({
                                userId : req.session.userLogin.id,
                                status : 'pending'
                            })
                            .then(order => {
                                db.Cart.create({
                                    userId : order.userId,
                                    productId : producto.id,
                                    cantidad : 1,
                                    orderId : order.id
                                })
                            })
                        }
                    })
                    .catch(error => console.log(error))
                }

            }else{

                let item = carrito[pos]
                item.cantidad = item.cantidad + 1
                item.total = item.cantidad * item.precio
                carrito[pos] = item

                if(req.session.userLogin){
                    db.Cart.update(
                        {
                            cantidad : item.cantidad
                        },
                        {
                            where : {
                                productId : item.id,
                                userId : req.session.userLogin.id
                            }
                        }
                    )
                    .then(()=>console.log('cantidad incrementada'))
                    .catch(error => console.log(error))
                }


            }
            req.session.carrito = carrito
            res.status(200).json(req.session.carrito)
        })


    },
    quitarItem : (req,res) => {
        let carrito = req.session.carrito;
        let id = req.params.id;

        let pos = verificar(carrito,id)

        let item  = carrito[pos]

        if(item.cantidad > 1){
            item.cantidad = item.cantidad - 1
            item.total = item.cantidad * item.precio
            carrito[pos] = item
            req.session.carrito = carrito

            if(req.session.userLogin){
                db.Cart.update(
                    {   
                        cantidad : item.cantidad                   
                    },
                    {
                        where : {
                            userId : req.session.userLogin.id,
                            productId : item.id
                        }
                    }
                )
                .then(()=>console.log('cantidad decrementada'))
                .catch(error => console.log(error))
            }

        }else{
            carrito.splice(item,1)
            req.session.carrito = carrito

            if(req.session.userLogin){
                db.Order.findOne({
                    where : {
                        userId : req.session.userLogin.id,
                        status : 'pending'
                    },
                    include : [
                        {association : 'carrito'}
                    ]
                })
                .then(order => {
                    if(order.carrito.length > 0){
                        db.Order.destroy({
                            where : {
                                id : order.id
                            }
                        })
                    }else{
                        db.Cart.destroy(
                            {
                                where : {
                                    userId : req.session.userLogin.id,
                                    productId : item.id
                                }
                            }
                        )
                        .then(()=>console.log('item eliminado del carrito'))
                    }
                })
                .catch(error => console.log(error))
            }
        }

        return res.status(200).json(req.session.carrito)



    },
    mostrarCarrito : (req,res) => {
        return res.status(200).json(req.session.carrito)
    },
    vaciarCarrito : (req,res) => {
        req.session.carrito = []
        return res.status(200).json(req.session.carrito)
    }
}