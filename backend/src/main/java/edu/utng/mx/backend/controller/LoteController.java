package edu.utng.mx.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import edu.utng.mx.backend.repository.LotesRepository;
import edu.utng.mx.backend.services.AlmacenistaServices;
import edu.utng.mx.backend.documentos.Lote;

@RestController
@RequestMapping("/api/lotes")
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

    /**
     * Actualizar un lote existente
     */
    @PutMapping("/actualizar")
    public ResponseEntity<?> updateLote(@RequestBody Lote lote) {
        try {
            if (!loteRepo.existsById(lote.getId())) {
                return new ResponseEntity<>("Lote no encontrado", HttpStatus.NOT_FOUND);
            }
            Lote loteActualizado = loteRepo.save(lote);
            return new ResponseEntity<>(loteActualizado, HttpStatus.OK);
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
     */
    @GetMapping("/filtrar")
    public ResponseEntity<List<Lote>> filtrarLotes(
        @RequestParam(required = false) String codigoLote,
        @RequestParam(required = false) String fechaCaducidad,
        @RequestParam(required = false) String producto) {
            try {
                List<Lote> lotesFiltro = almacenistaServices.filtrarLotes(codigoLote, fechaCaducidad, producto);
                return new ResponseEntity<>(lotesFiltro, HttpStatus.OK);
            } catch (Exception e) {
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }
    }
}
