let categorias = ['Perros','Gatos','Reptiles','Aves','Roedores','Peces','Insectos','Otros']

let supercategorias = categorias.map(categoria =>{ 
    let coso = {
      name: categoria,
      createdAt: new Date,
      updatedAt: new Date
    }
    return coso
  })

  console.log(supercategorias)