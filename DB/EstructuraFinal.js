//Colección Usuarios (plus - login)
[
  {
    "_id": "",
    "nombreUsuario": "",
    "apellidoPaterno": "",
    "apellidoMaterno": "",
    "correo": "",
    "contrasena": "",
    "rol": "",
    "direccion": ""
  }
]

//Colección Productos
[
  {
    "_id": "",
    "codigoBarras": 0,
    "nombreProducto": "",
    "tamano": "",
    "marca": "",
    "imagenUrl": [],
    "categoria": "",
    "precioPieza": 0,
    "precioCaja": 0,
    "cantidadPiezasPorCaja": 0,
    "Proveedor": [],
    "stockExhibe": 0, //El valor predeterminado
    "existenciaExhibida": 0, //Lo que vemos
    "stockAlmacen": 0, //El valor predeterminado
    "cantidadAlmacen": 0
  }
]

//Colección Tamaños
[
  {
    "_id": "",
    "nombreTamanio": "",
    "descripcion": "",
  }

]

//Colección Marcas
[
  {
    "_id": "",
    "nombreMarca": ""
  }

]

//Colección Proveedores
[
  {
    "_id": "",
    "nombreProveedor": "",
    "telefono": [],
    "paginaWeb":"",
    "correo": "",
    "direccion": {
      "calle":"",
      "numeroInterior":"",
      "numeroExterior":"",
      "colonia":"",
      "codigoPostal": 0,
      "ciudad":""
    }
  }
]

//Colección Lotes Por Compra
[
  {
    "_id": "",
    "codigoLote": "",
    "producto": "",
    "fechaCaducidad": Date,
    "cantidadComprada": 0,
    "fechaRegistro": Date
  }
]


//Colección Historial de Precios
[
  {
    "_id": "",
    "codigoBarras": 0,
    "producto": "",
    "historialPrecios": [
      {
        "precio": 0,
        "fechaCambio": ISODate(),
        "fechaFin": ISODate()
      },
      { "precio": 0, 
        "fechaCambio": ISODate(),
        "fechaFin": ISODate()
     }
    ]
  }
]


//Categorias 
[
  {
    "_id": "",
    "nombreCategoria": "",
  }
]

