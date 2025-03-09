package edu.utng.mx.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import edu.utng.mx.backend.repository.LotesRepository;
import edu.utng.mx.backend.repository.ProductoRepository;
import edu.utng.mx.backend.services.AlmacenistaServices;
import edu.utng.mx.backend.documentos.Lote;
import edu.utng.mx.backend.documentos.Producto;

@RestController
@RequestMapping("/api/almacenistas/lotes")
public class LoteController {

    @Autowired
    private LotesRepository loteRepo;

    @Autowired
    private ProductoRepository productoRepo;

    @Autowired
    private AlmacenistaServices almacenistaServices;

    /**
     * Crear un lote nuevo y actulizar la cantidad en productos
     */
    @PostMapping("/crear")
    public ResponseEntity<?> saveLote(@RequestBody Lote lote) {
        try {

            Optional<Lote> loteExistente = loteRepo.findByCodigoLote(lote.getCodigoLote());
            if (loteExistente.isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("El lote con el código " + lote.getCodigoLote() + " ya existe.");
            }
            // Guardar el lote en la base de datos
            Lote loteGuardado = loteRepo.save(lote);

            Optional<Producto> productoObtenido = productoRepo.encontrarPorCodigoBarras(lote.getCodigoBarras());

            Producto producto = productoObtenido.get();

            producto.setCantidadAlmacen(producto.getCantidadAlmacen() + lote.getCantidadComprada()); // Aqui suma la cantidad
                                                                                               // de alamcen con la
                                                                                               // nueva de lote
            productoRepo.save(producto);
            return new ResponseEntity<>(loteGuardado, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Obtener todos los lotes
     */
    @GetMapping("/ver")
    public ResponseEntity<?> findAllLotes() {
        try {
            List<Lote> lotes = loteRepo.findAll();
            return new ResponseEntity<>(lotes, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<?> updateLote(@PathVariable String id, @RequestBody Lote lote) {
        try {
            // Buscar el lote por su ID
            Optional<Lote> loteExistente = loteRepo.findById(id);

            if (loteExistente.isPresent()) {
                // Obtener el lote encontrado
                Lote loteToUpdate = loteExistente.get();

                // Actualizar con la nueva información
                loteToUpdate.setCodigoLote(lote.getCodigoLote());
                loteToUpdate.setProducto(lote.getProducto());
                loteToUpdate.setFechaCaducidad(lote.getFechaCaducidad());
                loteToUpdate.setCantidadComprada(lote.getCantidadComprada());
                loteToUpdate.setFechaRegistro(lote.getFechaRegistro());

                // Guardar el lote actualizado
                Lote updatedLote = loteRepo.save(loteToUpdate);
                return new ResponseEntity<>(updatedLote, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Lote no encontrado", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Eliminar un lote por ID
     */
    @DeleteMapping("/borrar/{id}")
    public ResponseEntity<String> deleteLote(@PathVariable String id) {
        try {
            if (!loteRepo.existsById(id)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Lote no encontrado");
            }
            loteRepo.deleteById(id);
            return ResponseEntity.ok("Lote eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/filtrar/nombre")
    public ResponseEntity<?> filtrarLotesPorNombre(@RequestParam String producto) {
        try {
            List<Lote> lotesFiltro = almacenistaServices.filtrarLotesPorNombre(producto);
            return ResponseEntity.ok(lotesFiltro);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error en el servidor: " + e.getMessage());
        }
    }

    @GetMapping("/filtrar/codigoLote")
    public ResponseEntity<?> filtrarLotesPorCodigoLote(@RequestParam String codigoLote) {
        try {
            List<Lote> lotesFiltro = almacenistaServices.filtrarLotesPorCodigoLote(codigoLote);
            return ResponseEntity.ok(lotesFiltro);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error en el servidor: " + e.getMessage());
        }
    }

    @GetMapping("/productos/buscarPorCodigoBarras/{codigoBarras}")
    public ResponseEntity<?> buscarProductoPorCodigoBarras(@PathVariable String codigoBarras) {
        try {
            Optional<Producto> producto = productoRepo.encontrarPorCodigoBarras(codigoBarras);
            if (producto.isPresent()) {
                return ResponseEntity.ok(producto.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Producto no encontrado");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error en el servidor: " + e.getMessage());
        }
    }

}
