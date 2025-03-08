package edu.utng.mx.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import edu.utng.mx.backend.repository.TamanioRepository;
import edu.utng.mx.backend.documentos.Tamanio;
@RestController
@RequestMapping("/api/formularios/tamanios")
public class TamaniosController {

    @Autowired
    private TamanioRepository tamanioRepo;
    /**
     * Obtener todas las tamaño
     */
    @GetMapping("/ver")
    public ResponseEntity<?> findAllTamanios() {
        try {
            List<Tamanio> tamanios = tamanioRepo.findAll();
            return new ResponseEntity<>(tamanios, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
