package edu.utng.mx.backend.controller;

import edu.utng.mx.backend.documentos.HistorialPrecio;
import edu.utng.mx.backend.documentos.HistorialPrecio.PrecioHistorial;
import edu.utng.mx.backend.services.HistorialPrecioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/historial-precios")
public class HistorialPrecioController {

    @Autowired
    private HistorialPrecioService historialPrecioService;

    // Crear un nuevo historial de precio
    @PostMapping
    public ResponseEntity<HistorialPrecio> crearHistorial(@RequestBody HistorialPrecio historialPrecio) {
        HistorialPrecio nuevoHistorial = historialPrecioService.crearHistorial(historialPrecio);
        return new ResponseEntity<>(nuevoHistorial, HttpStatus.CREATED);
    }

    // Obtener todos los historiales de precios de un producto por código de barras
    @GetMapping("/{codigoBarras}")
    public ResponseEntity<List<PrecioHistorial>> obtenerHistorialPorCodigoBarras(@PathVariable String codigoBarras) {
        List<HistorialPrecio> historialPrecios = historialPrecioService.encontrarTodosPorCodigoBarras(codigoBarras);
        if (historialPrecios.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        List<PrecioHistorial> precios = new ArrayList<>();

        for (HistorialPrecio historial : historialPrecios) {
            precios.addAll(historial.getHistorialPrecios());
        }

        return new ResponseEntity<>(precios, HttpStatus.OK);
    }

    // Obtener el historial más reciente de un producto por código de barras
    @GetMapping("/ultimo/{codigoBarras}")
    public ResponseEntity<HistorialPrecio> obtenerUltimoHistorialPorCodigoBarras(@PathVariable String codigoBarras) {
        Optional<HistorialPrecio> historialPrecio = historialPrecioService
                .encontrarUltimoHistorialPorCodigoBarras(codigoBarras);
        if (historialPrecio.isPresent()) {
            return new ResponseEntity<>(historialPrecio.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Eliminar un historial de precios por código de barras
    @DeleteMapping("/{codigoBarras}")
    public ResponseEntity<Void> eliminarHistorialPorCodigoBarras(@PathVariable String codigoBarras) {
        historialPrecioService.eliminarHistorialPorCodigoBarras(codigoBarras);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Agregar un nuevo historial de precio (modificar o agregar uno nuevo)
    @PutMapping
    public ResponseEntity<HistorialPrecio> actualizarHistorial(@RequestBody HistorialPrecio historialPrecio) {

        String codigoBarras = historialPrecio.getCodigoBarras();
        PrecioHistorial nuevoPrecio = historialPrecio.getHistorialPrecios().get(0); 
    
        HistorialPrecio actualizado = historialPrecioService.agregarNuevoHistorial(codigoBarras, nuevoPrecio);
    
        return new ResponseEntity<>(actualizado, HttpStatus.OK);
    }
    
}
