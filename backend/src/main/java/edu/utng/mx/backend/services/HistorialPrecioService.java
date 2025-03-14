package edu.utng.mx.backend.services;

import edu.utng.mx.backend.documentos.HistorialPrecio;
import edu.utng.mx.backend.documentos.HistorialPrecio.PrecioHistorial;
import edu.utng.mx.backend.repository.HistorialPrecioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Date;

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
        System.out.println("Buscando historial para: " + codigoBarras);
        List<HistorialPrecio> historial = historialPrecioRepository.encontrarTodosPorCodigoBarras(codigoBarras);
        System.out.println("Resultado encontrado: " + historial);
        return historial;
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
            // Si el historial existe, obtener el historial de precios
            HistorialPrecio historialPrecio = historialPrecioOpt.get();
            List<PrecioHistorial> historialPrecios = historialPrecio.getHistorialPrecios();
            
            // Si hay precios previos, actualizar el 'fechaFin' del último precio
            if (!historialPrecios.isEmpty()) {
                PrecioHistorial ultimoPrecio = historialPrecios.get(historialPrecios.size() - 1);
                ultimoPrecio.setFechaFin(new Date());  // Establecer la fechaFin del último precio
            }

            // Agregar el nuevo precio al historial
            historialPrecios.add(nuevoPrecio); // Agregar el nuevo precio al historial

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
