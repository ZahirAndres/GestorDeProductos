async function buscarPorCodigoBarrasAyudantePasillo(codigoDeBarras) {
    const resultado = await db.Productos.find(
        { codigoBarras: {$regex : new RegExp(codigoDeBarras, "i")} },
        { $expr: { $lte: ["$existenciaExhibida", "$stockExhibe"] }}
    ).sort({ existenciaExhibida: -1 });

    return resultado; 
}

async function buscarPorNombreAyudantePasillo(nombreDelProducto) {
const resultado = await db.Productos.find(
    { nombreProducto: {$regex : new RegExp(nombreDelProducto, "i")} },
    {$expr: { $lte: ["$existenciaExhibida", "$stockExhibe"] }}
).sort({ existenciaExhibida: -1 });

return resultado; 
}

async function buscarPorCategoriaAyudantePasillo(categoriaSeleccionada) {
const resultado = await db.Productos.find(
    { categoria: categoriaSeleccionada },
    {$expr: { $lte: ["$existenciaExhibida", "$stockExhibe"] }}
).sort({ existenciaExhibida: -1 });

return resultado; 
}


db.Usuarios.insertMany([
    {
      "nombreUsuario": "Carlos",
      "apellidoPaterno": "Gonzalez",
      "apellidoMaterno": "Martínez",
      "correo": "carlos.gonzalez@example.com",
      "contrasena": "1234",  // Recuerda que en la práctica, esto debería estar hasheado
      "rol": "Almacenista",
      "direccion": "Avenida Central 123, Ciudad de México"
    },
    {
      "nombreUsuario": "María",
      "apellidoPaterno": "Lopez",
      "apellidoMaterno": "Fernández",
      "correo": "maria.lopez@example.com",
      "contrasena": "1234",  // Recuerda que en la práctica, esto debería estar hasheado
      "rol": "Ayudante-Pasillo",
      "direccion": "Calle de la Paz 45, Guadalajara"
    }
  ]);
  

  // Insertar datos en la colección Tamaños
db.Tamanios.insertMany([
  {
    "nombreTamanio": "Pequeño",
    "descripcion": "Ideal para consumo individual"
  },
  {
    "nombreTamanio": "Mediano",
    "descripcion": "Tamaño estándar para familias pequeñas"
  },
  {
    "nombreTamanio": "Grande",
    "descripcion": "Presentación familiar o para eventos"
  }
]);

// Insertar datos en la colección Marcas
db.Marcas.insertMany([
  {
    "nombreMarca": "La Costeña"
  },
  {
    "nombreMarca": "Sabritas"
  },
  {
    "nombreMarca": "Gamesa"
  },
  {
    "nombreMarca": "Bimbo"
  },
  {
    "nombreMarca": "Coca-Cola"
  }
]);

// Insertar datos en la colección Proveedores
db.Proveedores.insertMany([
  {
    "nombreProveedor": "Distribuidora El Águila",
    "telefono": ["4421234567", "4427654321"],
    "correo": "contacto@elaguila.com",
    "direccion": "Calle Principal #123, Querétaro, QRO"
  },
  {
    "nombreProveedor": "Comercializadora del Centro",
    "telefono": ["5556789012"],
    "correo": "ventas@comdelcentro.com",
    "direccion": "Av. Insurgentes Sur #456, CDMX"
  },
  {
    "nombreProveedor": "Abarrotes Express",
    "telefono": ["8112345678"],
    "correo": "info@abarrotesexpress.com",
    "direccion": "Calle Hidalgo #78, Monterrey, NL"
  },
  {
    "nombreProveedor": "Suministros del Bajío",
    "telefono": ["4778901234", "4775678901"],
    "correo": "atencion@sumbajio.com",
    "direccion": "Blvd. López Mateos #321, León, GTO"
  }
]);


// Insertar datos en la colección Categorias
db.Categorias.insertMany([
  {
    "nombreProveedor": "Distribuidora El Águila",
    "telefono": ["4421234567", "4427654321"],
    "correo": "contacto@elaguila.com",
    "direccion": "Calle Principal #123, Querétaro, QRO"
  },
  {
    "nombreProveedor": "Comercializadora del Centro",
    "telefono": ["5556789012"],
    "correo": "ventas@comdelcentro.com",
    "direccion": "Av. Insurgentes Sur #456, CDMX"
  },
  {
    "nombreProveedor": "Abarrotes Express",
    "telefono": ["8112345678"],
    "correo": "info@abarrotesexpress.com",
    "direccion": "Calle Hidalgo #78, Monterrey, NL"
  },
  {
    "nombreProveedor": "Suministros del Bajío",
    "telefono": ["4778901234", "4775678901"],
    "correo": "atencion@sumbajio.com",
    "direccion": "Blvd. López Mateos #321, León, GTO"
  }
]);


db.Categorias.insertMany([
  { "nombreCategoria": "Lácteos y Derivados" },
  { "nombreCategoria": "Carnes Frías y Embutidos" },
  { "nombreCategoria": "Bebidas" },
  { "nombreCategoria": "Dulces y Golosinas" },
  { "nombreCategoria": "Botanas" },
  { "nombreCategoria": "Cereales y Galletas" },
  { "nombreCategoria": "Enlatados y Conservas" },
  { "nombreCategoria": "Harinas y Panadería" },
  { "nombreCategoria": "Aceites y Condimentos" },
  { "nombreCategoria": "Abarrotes Básicos (Arroz, Frijol, Azúcar, etc.)" },
  { "nombreCategoria": "Productos de Limpieza" },
  { "nombreCategoria": "Higiene Personal" },
  { "nombreCategoria": "Papel y Desechables" }
]);
