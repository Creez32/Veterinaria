window.addEventListener('load', () => {

    /* Funciones para no declarar tantas veces document */

    const $ = (tag) => document.querySelector(tag)
    const id = (tag) => document.getElementById(tag)

    /* Expresiones Regulares */
    let regExLetras = /^[a-zA-Z\sñáéíóúü]*$/
    let regExImg = /\.(jpg|jpeg|png)$/;


    /* Inputs a validar */
    let form = $('#crear-productos')
    let nombre = $('#nombre')
    let marca = $('#marca')
    let precio = $('#precio')
    let descuento = $('#descuento')
    let edad = $('#edad')
    let peso = $('#peso')
    let stock = $('#stock')
    let categoria = $('#categoria')
    let variedad = $('#variedad')
    let descripcion = $('#descripcion')
    let boton = $('#boton')
    let image = $('#product-img')
    let small = $('#small-img')


    /* Validacion */
    
    image.addEventListener('change', () => {
        if (!regExImg.exec(image.value)) {
            small.innerHTML = 'Solo se permiten imagenes con extension JPG, PNG, JPEG'
            small.style.color = 'red'
        }else{
            small.innerHTML = ''
        }
    })


})