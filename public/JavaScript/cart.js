let spanCantidad = document.querySelector('span.badge');
let changuito = document.querySelector('#lista-carrito tbody');
let spanTotal = document.getElementById('total');
let cartHead = document.getElementById('cart-head');
let cartFooter = document.getElementById('cart-footer');
let cartEmpty = document.getElementById('cart-empty');
let btnCartEmpty = document.getElementById('btn-delete-cart');
let btnNextBuy = document.getElementById('btn-next-buy')

//const urlBase = 'http://localhost:3000'

const urlBase = window.location.origin


const agregarItem = async (e,id) => {

    e.preventDefault()

    try {
        let response = await fetch(urlBase + '/agregar/' + id)
        let result = await response.json()
        cargarTabla(result)
        getCarrito()
    } catch (error) {
        console.log(error)
    }

}

const cargarTabla = carrito => {
    changuito.innerHTML = "";
    carrito.forEach(producto => {

        let item = `
        <td class="col-2">
        <img class="w-100" src="${producto.imagen}"> 
        </td>
        <td class="text-center col-3">
        <a href="#" class="text-danger h5" onClick="return item('${producto.id}',-1)"><i class="fas fa-minus-square"></i></a>
        <span class="h5">${producto.cantidad}<span>
        <a href="#" class="text-success h5" onClick="return item('${producto.id}',1)"><i class="fas fa-plus-square"></i></a>
        </td>
        <td>
        ${producto.nombre}
        </td>
       
        <td class="">
        <span>$</span><span class="float-end">${producto.precio}</span>
        </td>
        <td class="">
        <span>$</span><span class="float-end">${producto.total}</span>
        </td>
        `
        changuito.innerHTML += item
    });
    return false
}

const getCarrito = async () => {
    try {
        let response = await fetch(urlBase + '/listar')
        let result = await response.json()
        mostrarCantidad(result)
    } catch (error) {
        console.log(error)
    }
}

const mostrarCantidad = carrito => {
    let cantidad = 0;
    let total = 0;

    carrito.forEach(item => {
        cantidad += item.cantidad
        total += item.total
    })

    spanCantidad.innerHTML = cantidad
    spanTotal.innerHTML = `<span>$</span> <span class="float-end">${total}</span>`

    if(cantidad == 0){
        cartHead.setAttribute('hidden',true)
        cartFooter.setAttribute('hidden',true)
        cartEmpty.removeAttribute('hidden')
        btnCartEmpty.setAttribute('disabled',true);
        btnNextBuy.setAttribute('disabled',true);
    }else{
        cartHead.removeAttribute('hidden')
        cartFooter.removeAttribute('hidden')
        cartEmpty.setAttribute('hidden',true)
        btnCartEmpty.removeAttribute('disabled');
        btnNextBuy.removeAttribute('disabled');
    }
}

const item = async(id,type) => {
    let url;
    type == 1 ? url = urlBase + '/agregar/' + id : url = urlBase + '/quitar/' + id

    try {
        let response = await fetch(url)
        let result = await response.json()
        mostrarCantidad(result)
        cargarTabla(result)
    } catch (error) {
        console.log(error);
    }
}

const vaciarCarrito = async () => {
    try {
        let response = await fetch(urlBase + '/vaciar')
        let result = await response.json()
        mostrarCantidad(result)
    } catch (error) {
        console.log(error);
    }
}

btnCartEmpty.addEventListener('click',(e) => {
    e.preventDefault()
    while(changuito.firstChild){
        changuito.removeChild(changuito.firstChild)
    }
    vaciarCarrito()
})

const mostrarInicial = async () => {
    let response = await fetch(urlBase + '/listar')
    let result = await response.json()
    mostrarCantidad(result)
    cargarTabla(result)
}


window.addEventListener('load',() => {
    getCarrito()
    mostrarInicial()
})