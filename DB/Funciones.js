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
  