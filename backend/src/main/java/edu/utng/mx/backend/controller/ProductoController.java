package edu.utng.mx.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import edu.utng.mx.backend.repository.*;
import edu.utng.mx.backend.documentos.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;
import java.util.Map;


@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    @Autowired
    private ProductoRepository productoRepo;
    @Autowired
    private HistorialPrecioRepository historialPrecioRepo;

@PostMapping("/crear")
public ResponseEntity<?> saveProducto(@RequestBody Producto producto) {
    try {
        // Verificar si el producto ya existe
        Optional<Producto> productoExistente = productoRepo.encontrarPorCodigoBarras(producto.getCodigoBarras());
        if (productoExistente.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                .body("El producto con el código de barras " + producto.getCodigoBarras() + " ya existe.");
        }

        // Buscar si ya existe un historial de precios para el mismo código de barras
        Optional<HistorialPrecio> historialExistente = historialPrecioRepo.encontrarPorCodigoBarras(producto.getCodigoBarras());

        HistorialPrecio historial;
        if (historialExistente.isPresent()) {
            // Si ya existe, usar el historial existente
            historial = historialExistente.get();
        } else {
            // Si no existe, crear uno nuevo
            historial = new HistorialPrecio();
            historial.setCodigoBarras(producto.getCodigoBarras());
            historial.setProducto(producto.getNombreProducto()); 
        }

        // Obtener la lista actual de precios (si ya existe)
        List<HistorialPrecio.PrecioHistorial> listaPrecios = historial.getHistorialPrecios();
        if (listaPrecios == null) {
            listaPrecios = new ArrayList<>();
        }

        // Marcar fechaFin del último precio si existe
        if (!listaPrecios.isEmpty()) {
            listaPrecios.get(listaPrecios.size() - 1).setFechaFin(new Date());
        }

        // Crear nuevo precio
        HistorialPrecio.PrecioHistorial nuevoPrecio = new HistorialPrecio.PrecioHistorial(
            producto.getPrecioPieza(),
            new Date(),  // Fecha de cambio
            null  // Fecha de fin (se establecerá cuando haya otro cambio de precio)
        );

        // Agregar el nuevo precio a la lista
        listaPrecios.add(nuevoPrecio);
        historial.setHistorialPrecios(listaPrecios);

        // Guardar el historial actualizado
        historialPrecioRepo.save(historial);

        // Guardar el producto
        Producto prosave = productoRepo.save(producto);
        
        return new ResponseEntity<>(prosave, HttpStatus.CREATED);
    } catch (Exception e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

    

    @GetMapping("/ver")
    public ResponseEntity<?> findAllUsuarios() {
        try {
            List<Producto> productos = productoRepo.findAll();
            return new ResponseEntity<List<Producto>>(productos, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/actualizar")
    public ResponseEntity<?> updateProducto(@RequestBody Producto producto) {
        try {
            Producto prosave = productoRepo.save(producto);
            return new ResponseEntity<>(prosave, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/borrar/{id}")
    public ResponseEntity<?> deleteProducto(@PathVariable String id) {
        if (!productoRepo.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Producto no encontrado"));
        }
        try {
            productoRepo.deleteById(id);
            return ResponseEntity.ok(Map.of("message", "Producto eliminado correctamente"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/actualizar-stock/{id}")
public ResponseEntity<?> updateStock(@PathVariable String id, @RequestBody Map<String, Integer> request) {
    try {
        Optional<Producto> optionalProducto = productoRepo.encontrarPorCodigoBarras(id);
        if (optionalProducto.isPresent()) {
            Producto producto = optionalProducto.get();
            int stockExhibe = request.get("stockExhibe");
            
            System.out.println("stockExhibe: " + stockExhibe);
            int nuevaCantidadAlmacen = producto.getCantidadAlmacen() - stockExhibe;
            
            // Validar que la cantidad no sea negativa
            if (nuevaCantidadAlmacen < 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No hay suficiente stock en el almacén");
            }
            
            producto.setCantidadAlmacen(nuevaCantidadAlmacen);
            productoRepo.save(producto);
            
            System.out.println("Producto actualizado: " + producto);
            return ResponseEntity.ok(producto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Producto no encontrado");
        }
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
    }
}


}
