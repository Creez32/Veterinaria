

const badge = document.querySelector('#badge');
const changuito = document.querySelector('#lista-carrito tbody');
const spanTotal = document.getElementById('total');
const cartHead = document.getElementById('cart-head');
const cartFooter = document.getElementById('cart-footer');
const cartEmpty = document.getElementById('cart-empty');
const btnCartEmpty = document.getElementById('boton-vaciarCarrito');
const btnNextBuy = document.getElementById('btn-next-buy')

console.log(btnCartEmpty);


//const urlBase = 'http://localhost:3000'

const urlBase = window.location.origin

const agregarItem = async (e,id) => {
    console.log('Item Agregado');

    e.preventDefault()

    try {
        let response = await fetch(urlBase + '/cart/agregar/' + id)
        let result = await response.json()
        console.log(result);
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
        <img class="w-100" src="/images/products/${producto.imagen}"> 
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
        let response = await fetch(urlBase + '/cart/listar')
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

    badge.innerHTML = cantidad
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
    type == 1 ? url = urlBase + '/cart/agregar/' + id : url = urlBase + '/cart/quitar/' + id

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
        let response = await fetch(urlBase + '/cart/vaciar')
        let result = await response.json()
        mostrarCantidad(result)
    } catch (error) {
        console.log(error);
    }
}

btnCartEmpty.addEventListener('click',(e) => {
    console.log('Vaciando Carrito');
    e.preventDefault()
    while(changuito.firstChild){
        changuito.removeChild(changuito.firstChild)
    }
    vaciarCarrito()
})

const mostrarInicial = async () => {
    let response = await fetch(urlBase + '/cart/listar')
    let result = await response.json()
    mostrarCantidad(result)
    cargarTabla(result)
}


    window.addEventListener('load',() => {

        getCarrito()
        mostrarInicial()

    })


