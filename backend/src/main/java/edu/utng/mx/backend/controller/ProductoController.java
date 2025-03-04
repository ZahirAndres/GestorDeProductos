package edu.utng.mx.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import edu.utng.mx.backend.repository.*;
import edu.utng.mx.backend.documentos.*;
import java.util.Optional;
import java.util.Map;


@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    @Autowired
    private ProductoRepository productoRepo;

    @PostMapping("/crear")
    public ResponseEntity<?> saveProducto(@RequestBody Producto producto) {
        try {
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
            Optional<Producto> optionalProducto = productoRepo.findById(id);
            if (optionalProducto.isPresent()) {
                Producto producto = optionalProducto.get();
                producto.setStockExhibe(request.get("stockExhibe"));
                productoRepo.save(producto);
                return ResponseEntity.ok(producto);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Producto no encontrado");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

}
