/*========================
    FILTRO DE BRANDON
========================*/

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
