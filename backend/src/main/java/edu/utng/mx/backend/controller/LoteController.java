package edu.utng.mx.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import edu.utng.mx.backend.repository.LotesRepository;
import edu.utng.mx.backend.services.AlmacenistaServices;
import edu.utng.mx.backend.documentos.Lote;

@RestController
@RequestMapping("/api/almacenistas/lotes")
public class LoteController {

    @Autowired
    private LotesRepository loteRepo;

    @Autowired
    private AlmacenistaServices almacenistaServices;

    /**
     * Crear un lote nuevo
     */
    @PostMapping("/crear")
    public ResponseEntity<?> saveLote(@RequestBody Lote lote) {
        try {
            Lote loteGuardado = loteRepo.save(lote);
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

    /**
     * Filtrar lotes por código de lote, fecha de caducidad o nombre del producto
     * DESUSO
     */
    @GetMapping("/filtrar")
    public ResponseEntity<?> filtrarLotes(
            @RequestParam(required = false) String codigoLote,
            @RequestParam(required = false) String fechaCaducidad,
            @RequestParam(required = false) String producto) {
        try {
            List<Lote> lotesFiltro = almacenistaServices.filtrarLotes(codigoLote, fechaCaducidad, producto);
            return ResponseEntity.ok(lotesFiltro);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error en el servidor: " + e.getMessage());
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

}
