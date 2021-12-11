let variety = ['Alimento','Medicina','Juguetes','Correas','Vacunas','Contenedores','Accesorios','Otros']

 let variedad = variety.map(product =>{ 
  let coso = {
    name: product,
    createdAt: new Date,
    updatedAt: new Date
  }
  return coso
})

console.log(variedad);