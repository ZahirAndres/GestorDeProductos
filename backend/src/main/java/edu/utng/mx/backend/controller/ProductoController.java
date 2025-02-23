package edu.utng.mx.backend.documentos;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import edu.utng.mx.backend.repository.*;
import edu.utng.mx.backend.documentos.*;

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
    public ResponseEntity<String> deleteProducto(@PathVariable String id) {
        try {
            productoRepo.deleteById(id);
            return ResponseEntity.ok("Fue eliminado");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

}
