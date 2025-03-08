package edu.utng.mx.backend.services;

import edu.utng.mx.backend.documentos.HistorialPrecio;
import edu.utng.mx.backend.documentos.HistorialPrecio.PrecioHistorial;
import edu.utng.mx.backend.repository.HistorialPrecioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HistorialPrecioService {

    @Autowired
    private HistorialPrecioRepository historialPrecioRepository;

    // Crear un nuevo historial de precios (nuevo documento)
    public HistorialPrecio crearHistorial(HistorialPrecio historialPrecio) {
        return historialPrecioRepository.save(historialPrecio);
    }

    // Buscar historial de precios por código de barras
    public Optional<HistorialPrecio> encontrarPorCodigoBarras(String codigoBarras) {
        return historialPrecioRepository.encontrarPorCodigoBarras(codigoBarras);
    }

    // Buscar todos los historiales de precios de un producto dado un código de barras
    public List<HistorialPrecio> encontrarTodosPorCodigoBarras(String codigoBarras) {
        return historialPrecioRepository.encontrarTodosPorCodigoBarras(codigoBarras);
    }

    // Eliminar historial de precios por código de barras
    public void eliminarHistorialPorCodigoBarras(String codigoBarras) {
        historialPrecioRepository.deleteByCodigoBarras(codigoBarras);
    }

    // Actualizar el historial de precios, es decir, agregar un nuevo precio al historial de un producto
    public HistorialPrecio agregarNuevoHistorial(String codigoBarras, PrecioHistorial nuevoPrecio) {
        // Buscar el historial de precios del producto por código de barras
        Optional<HistorialPrecio> historialPrecioOpt = historialPrecioRepository.encontrarPorCodigoBarras(codigoBarras);
        
        if (historialPrecioOpt.isPresent()) {
            // Si el historial existe, agregar el nuevo precio al array de precios
            HistorialPrecio historialPrecio = historialPrecioOpt.get();
            historialPrecio.getHistorialPrecios().add(nuevoPrecio); // Agregar el nuevo precio al historial

            // Guardar los cambios
            return historialPrecioRepository.save(historialPrecio);
        } else {
            // Si no existe, crear un nuevo historial de precios para el producto
            HistorialPrecio nuevoHistorial = new HistorialPrecio();
            nuevoHistorial.setCodigoBarras(codigoBarras);
            nuevoHistorial.setHistorialPrecios(List.of(nuevoPrecio)); // Crear una lista con el primer precio

            // Guardar el nuevo historial
            return historialPrecioRepository.save(nuevoHistorial);
        }
    }

    // Buscar el historial más reciente de un producto por código de barras
    public Optional<HistorialPrecio> encontrarUltimoHistorialPorCodigoBarras(String codigoBarras) {
        return historialPrecioRepository.encontrarUltimoHistorialPorCodigoBarras(codigoBarras);
    }
}
