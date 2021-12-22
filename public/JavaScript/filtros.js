console.log("conectado con javascript");

const $ = (e) => document.querySelector(e);

let categorias = $("#select-filter");
let order = $("#select-order");
let mostrarProductos = $("#table");
let total = $("#total-productos");

const addItem = (producto) => {
  let item = `
        <div class="wrapper">
    <div class="container">
      <div class="top"  style="background-image: url('/images/products/${producto.images[0].file}');">
        
      </div>
      <div class="bottom">
        <div class="left">
          <div class="details">
            <h3>${producto.name}</h3>
            <p>$ ${producto.price}</p>
          </div>
          <div class="buy"><i class="fas fa-cart-plus"></i></div>
        </div>
      </div>
    </div>
    <div class="inside">
      <div class="icon"><i class="fas fa-info-circle"></i></div>
      <div class="contents">
        <table>
            <tr>
                <th>Descripcion</th>
                </tr>
                <tr>
                <td>${producto.description}</td>
            </tr>
            <tr>
                <th>Edad</th>
                <th>Peso</th>
            </tr>
            <tr>
                <td>${producto.edad}</td>
                <td>${producto.peso}</td>
            </tr>
            
            <tr>
                <th>Categoria</th>
                <th>Variedad</th>
            </tr>
            <tr>
                <td>${producto.category.name}</td>
                <td>${producto.variety.name}</td>
            </tr>
            <tr>
                <th>Stock</th>
                <th>Colores</th>
            </tr>
            <tr>
                <td>${producto.stock}</td>
                <td>
                ${producto.colors.forEach(color => {
                  color.nombre
                })}
                </td>
            </tr>
        </table>
            </div>
        </div>
    </div>
        `;
        mostrarProductos.innerHTML += item
};

const getAllProducts = async () => {
  let response = await fetch(window.origin + "/api/products-all");
  let products = await response.json();
  localStorage.setItem('products',JSON.stringify(products.data))
};
getAllProducts();

const getProducts = async (categorias, order='id') => {
  try {
    let response = await fetch(
      window.origin + `/api/products?filter=${categorias}&order=${order}`
    );
    let productos = await response.json();
    console.log(productos);
    mostrarProductos.innerHTML = null;
    total.innerHTML = null;
    total.innerHTML = productos.meta.total + " mostrados";

    productos.data.forEach(producto =>{
      addItem(producto)
    })
  } catch (error) {
    console.log(error);
  }
};
getProducts(0)


categorias.addEventListener('change',e => {
  getProducts(e.target.value,order.value)
})

order.addEventListener('change',e => {
  getProducts(categorias.value , e.target.value)
})