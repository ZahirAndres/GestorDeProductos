package edu.utng.mx.backend.controller.almacenista;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import edu.utng.mx.backend.documentos.Lote;
import edu.utng.mx.backend.services.LoteService;

import java.util.List;

@RestController
@RequestMapping("/api/almacenista/lotes")
public class LoteController {

    @Autowired
    private LoteService loteService;

    /**
     * Crar un lote nuevo
     * 
     * @param lote
     * @return regresa la respuetsa de estado
     */
    @PostMapping("/crear")
    public ResponseEntity<Lote> crearLote(@RequestBody Lote lote) {

        Lote nuevoLote = loteService.crearLote(lote);
        return ResponseEntity.ok(nuevoLote);
    }

    /**
     * Filtrar lotes
     * 
     * @param categoria categoria del lote
     * @param fecha     fecha de caducidad
     * @param nombre    nombre del producto
     * @return regresa la lista de lotes filtrados
     */
    @GetMapping("/filtrar")
    public ResponseEntity<List<Lote>> filtrarLotes(
            @RequestParam(required = false) String categoria,
            @RequestParam(required = false) String fecha,
            @RequestParam(required = false) String nombre) {

        List<Lote> lotes = loteService.filtrarLotes(categoria, fecha, nombre);
        return ResponseEntity.ok(lotes);
    }

}
