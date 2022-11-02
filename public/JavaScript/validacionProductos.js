window.addEventListener('load', () => {

    /* Funciones para no declarar tantas veces document */

    const $ = (tag) => document.querySelector(tag)
    const id = (tag) => document.getElementById(tag)

    // Función para validar en línea //
    const funcValidate = (obj) => {
        let arr = Object.values(validate)
        console.log(arr);
        if (!arr.includes(false)) {
            bttnEnviar.disabled = false
            bttnEnviar.style.backgroundColor = '#3884f6'
        } else {
            bttnEnviar.disabled = true
            bttnEnviar.style.backgroundColor = '#gray'
        }
    }

    /* Expresiones Regulares */
    let regExLetras = /^[a-zA-Z\sñáéíóúü]*$/
    let regExImg = /\.(jpg|jpeg|png)$/;
    const regExLetter = /^[A-Z]+$/i;


    /* Inputs a validar */
    let form = $('#crear-productos')
    let nombre = $('#name')
    let precio = $('#price')
    let marca = $('#brand')
    let descuento = $('#discount')
    let edad = $('#edad')
    let peso = $('#peso')
    let stock = $('#stock')
    let categoria = $('#categoria')
    let variedad = $('#variedad')
    let descripcion = $('#description')
    let image = $('#product-img')
    let small = $('#small-img')

    const bttnEnviar = $('#send')

    bttnEnviar.disabled = true
    bttnEnviar.style.backgroundColor = 'gray'


    nombre.focus()

    /* Validacion */

    image.addEventListener('change', () => {
        if (!regExImg.exec(image.value)) {
            small.innerHTML = 'Solo se permiten imagenes con extension JPG, PNG, JPEG'
            small.style.color = 'red'
        } else {
            small.innerHTML = ''
        }
    })

    nombre.addEventListener('blur', function () {
        switch (true) {
            case !this.value.trim():
                $('#errorNombre').innerHTML = "Debes ingresar tu nombre";
                this.classList.add('is-invalid')
                validate.nombre = false
                break;
            case !regExLetter.test(this.value.trim()):
                $('#errorNombre').innerHTML = "Solo caracteres alfabéticos";
                this.classList.add('is-invalid')
                validate.nombre = false
                break
            case this.value.trim().length < 2 || this.value.trim().length > 255:
                $('#errorNombre').innerHTML = "El nombre debe tener como mínimo 2 caracteres";
                this.classList.add('is-invalid')
                validate.nombre = false
                break
            default:
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                $('#errorNombre').innerHTML = null;
                validate.nombre = true
                break;
        }
        funcValidate(validate)
    });
    precio.addEventListener('blur', function () {
        switch (true) {
            case !this.value.trim():
                $('#errorPrice').innerHTML = "Debes ingresar un precio";
                this.classList.add('is-invalid')
                validate.precio = false
                break;
            default:
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                $('#errorPrice').innerHTML = null;
                validate.precio = true
                break;
        }
        funcValidate(validate)
    });
    marca.addEventListener('blur', function () {
        switch (true) {
            case !this.value.trim():
                $('#errorBrand').innerHTML = "Debes ingresar la marca";
                this.classList.add('is-invalid')
                validate.marca = false
                break;
            default:
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                $('#errorBrand').innerHTML = null;
                validate.marca = true
                break;
        }
        funcValidate(validate)
    });
    descuento.addEventListener('blur', function () {
        switch (true) {
            case !this.value.trim():
                $('#errorDiscount').innerHTML = "Debes ingresar un valor";
                this.classList.add('is-invalid')
                validate.descuento = false
                break;
            default:
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                $('#errorDiscount').innerHTML = null;
                validate.descuento = true
                break;
        }
        funcValidate(validate)
    });
    edad.addEventListener('blur', function () {
        switch (true) {
            case !this.value.trim():
                $('#errorEdad').innerHTML = "Debes ingresar una edad";
                this.classList.add('is-invalid')
                validate.edad = false
                break;
            default:
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                $('#errorEdad').innerHTML = null;
                validate.edad = true
                break;
        }
        funcValidate(validate)
    });
    peso.addEventListener('blur', function () {
        switch (true) {
            case !this.value.trim():
                $('#errorPeso').innerHTML = "Debes ingresar el peso";
                this.classList.add('is-invalid')
                validate.peso = false
                break;
            default:
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                $('#errorPeso').innerHTML = null;
                validate.peso = true
                break;
        }
        funcValidate(validate)
    });
    stock.addEventListener('blur', function () {
        switch (true) {
            case !this.value.trim():
                $('#errorStock').innerHTML = "Debes ingresar un stock";
                this.classList.add('is-invalid')
                validate.stock = false
                break;
            default:
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                $('#errorStock').innerHTML = null;
                validate.stock = true
                break;
        }
        funcValidate(validate)
    });
    categoria.addEventListener('blur', function () {
        switch (true) {
            case !this.value.trim():
                $('#errorCategoria').innerHTML = "Debes ingresar una categoria";
                this.classList.add('is-invalid')
                validate.categoria = false
                break;
            default:
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                $('#errorCategoria').innerHTML = null;
                validate.categoria = true
                break;
        }
        funcValidate(validate)
    });
    variedad.addEventListener('blur', function () {
        switch (true) {
            case !this.value.trim():
                $('#errorVariedad').innerHTML = "Debes ingresar una categoria";
                this.classList.add('is-invalid')
                validate.variedad = false
                break;
            default:
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                $('#errorVariedad').innerHTML = null;
                validate.variedad = true
                break;
        }
        funcValidate(validate)
    });
    descripcion.addEventListener('blur', function () {
        switch (true) {
            case !this.value.trim():
                $('#errorDescription').innerHTML = "Debes ingresar una Descripcion";
                this.classList.add('is-invalid')
                validate.descripcion = false
                break;
            case this.value.trim().length < 2 || this.value.trim().length > 255:
                $('#errorDescription').innerHTML = "El nombre debe tener como mínimo 2 caracteres";
                this.classList.add('is-invalid')
                validate.descripcion = false
                break
            default:
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                $('#errorDescription').innerHTML = null;
                validate.descripcion = true
                break;
        }
        funcValidate(validate)
    });

    const validate = {
        nombre: false,
        precio: false,
        marca: false,
        descuento: false,
        edad: false,
        peso: false,
        stock: false,
        categoria: false,
        variedad: false,
        image: true,
        descripcion: false
    }

})