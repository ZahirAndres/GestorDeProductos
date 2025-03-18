//El "0" simboliza que se agregue lo que el usuario necesita buscar.

// Consulta para encontrar productos por nombre (sin distinción de mayúsculas/minúsculas)
db.productos.aggregate([
    { $match: { 'nombreProducto': { $regex: /?0/, $options: 'i' } } },
    { $sort: { 'nombreProducto': 1 } }
]);

// Consulta para encontrar productos por categoría
db.productos.aggregate([
    { $match: { 'categoria': { $regex: /?0/, $options: 'i' } } },
    { $sort: { 'nombreProducto': 1 } }
]);

// Consulta para encontrar productos por código de barras
db.productos.aggregate([
    { $match: { 'codigoBarras': { $regex: /?0/, $options: 'i' } } },
    { $sort: { 'nombreProducto': 1 } }
]);

// Consulta para encontrar productos por categoría y nombre
db.productos.aggregate([
    { $match: { 
        $or: [
            { 'categoria': /?0/ },
            { 'nombreProducto': { $regex: /?1/, $options: 'i' } }
        ]
    } },
    { $sort: { 'nombreProducto': 1 } }
]);

// Consulta para encontrar productos con existencia por debajo de su stock mínimo (por código de barras)
db.productos.aggregate([
    { $addFields: { faltanteEnEstante: { $subtract: [ '$stockExhibe', '$existenciaExhibida' ] } } },
    { $match: { 'codigoBarras': { $regex: /?0/, $options: 'i' }, $expr: { $lte: [ '$existenciaExhibida', '$stockExhibe' ] } } },
    { $sort: { faltanteEnEstante: -1 } }
]);

// Consulta para encontrar productos con existencia por debajo de su stock mínimo (por nombre)
db.productos.aggregate([
    { $addFields: { faltanteEnEstante: { $subtract: [ '$stockExhibe', '$existenciaExhibida' ] } } },
    { $match: { 'nombreProducto': { $regex: /?0/, $options: 'i' }, $expr: { $lte: [ '$existenciaExhibida', '$stockExhibe' ] } } },
    { $sort: { faltanteEnEstante: -1 } }
]);

// Consulta para encontrar productos con existencia por debajo de su stock mínimo (por categoría)
db.productos.aggregate([
    { $addFields: { faltanteEnEstante: { $subtract: [ '$stockExhibe', '$existenciaExhibida' ] } } },
    { $match: { 'categoria': /?0/, $expr: { $lte: [ '$existenciaExhibida', '$stockExhibe' ] } } },
    { $sort: { faltanteEnEstante: -1 } }
]);

// Consulta para encontrar todos los productos con existencia por debajo de su stock mínimo
db.productos.aggregate([
    { $addFields: { faltanteEnEstante: { $subtract: [ '$stockExhibe', '$existenciaExhibida' ] } } },
    { $match: { $expr: { $lt: [ '$existenciaExhibida', '$stockExhibe' ] } } },
    { $sort: { faltanteEnEstante: -1 } }
]);

// Consulta para encontrar productos con existencia por debajo de su stock mínimo y ordenados por faltante en estante
db.productos.aggregate([
    { $addFields: { faltanteEnEstante: { $subtract: [ '$stockExhibe', '$existenciaExhibida' ] } } },
    { $match: { 
        $and: [
            { $or: [ { 'categoria': /?0/ }, { 'nombreProducto': /?0/ } ] },
            { $expr: { $lte: [ '$existenciaExhibida', '$stockExhibe' ] } }
        ]
    } },
    { $sort: { faltanteEnEstante: -1 } }
]);

// Consulta para encontrar productos visibles para el cliente (con existencia mayor a 0)
db.productos.find({ 'existenciaExhibida': { $gt: 0 } });

// Consulta para encontrar productos visibles por nombre (con existencia mayor a 0)
db.productos.find({ 'nombreProducto': { $regex: /?0/, $options: 'i' }, 'existenciaExhibida': { $gt: 0 } });

// Consulta para encontrar productos visibles por categoría (con existencia mayor a 0)
db.productos.find({ 'categoria': /?0/, 'existenciaExhibida': { $gt: 0 } });

// Consulta para encontrar productos visibles por categoría y nombre (con existencia mayor a 0)
db.productos.find({ 
    $and: [
        { 'categoria': /?0/ },
        { 'nombreProducto': { $regex: /?1/, $options: 'i' } },
        { 'existenciaExhibida': { $gt: 0 } }
    ]
});

// Consulta para encontrar historial de precios por código de barras
db.historialPrecios.find({ 'codigoBarras': /?0/ });

// Consulta para encontrar todos los historiales de precios por código de barras
db.historialPrecios.find({ 'codigoBarras': /?0/ });

// Consulta para encontrar el último historial de precios por código de barras
db.historialPrecios.find({ 'codigoBarras': /?0/ }).sort({ 'historialPrecios.fechaCambio': -1 }).limit(1);

// Consulta para encontrar lotes por producto (filtro por nombre)
db.lotes.aggregate([
    { $match: { 'producto': { $regex: /?0/, $options: 'i' } } },
    { $sort: { 'fechaCaducidad': -1, 'codigoBarras': 1 } }
]);

// Consulta para encontrar lotes por código de lote
db.lotes.aggregate([
    { $match: { 'codigoLote': { $regex: /?0/, $options: 'i' } } },
    { $sort: { 'fechaCaducidad': -1 } }
]);

// Consulta para encontrar un producto por código de barras
db.productos.find({ 'codigoBarras': ?0 });

// Consulta para encontrar proveedores del producto por nombre de proveedor
db.proveedores.find({ 'nombreProveedor': { $in: [] } });

// Consulta para encontrar un usuario por correo
db.usuarios.find({ 'correo': ?0 });

// Consulta para encontrar un usuario por correo y contraseña usando Query personalizada
db.usuarios.find({ 'correo': ?0, 'contrasena': ?1 });
