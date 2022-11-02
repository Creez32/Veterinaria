window.addEventListener('load', () => {

    /* Funciones para no declarar tantas veces document */

    const $ = (tag) => document.querySelector(tag)
    const id = (tag) => document.getElementById(tag)

    /* Expresiones Regulares */
    let regExLetras = /^[a-zA-Z\sñáéíóúü]*$/
    let regExImg = /\.(jpg|jpeg|png)$/;


    /* Inputs a validar */
    let form = $('#loginForm')
    let email = $('#email')
    let pass = $('#pass')
    let boton = $('#boton')
    let small = $('#small-img')


    /* Validacion */
    
    


})