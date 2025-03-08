package edu.utng.mx.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import edu.utng.mx.backend.repository.MarcaRepository;
import edu.utng.mx.backend.documentos.Marca;


@RestController
@RequestMapping("/api/formularios/marcas")
public class MarcaController {

    @Autowired
    private MarcaRepository marcaRepo;
    /**
     * Obtener todas las marcas
     */
    @GetMapping("/ver")
    public ResponseEntity<?> findAllMarcas() {
        try {
            List<Marca> marcas = marcaRepo.findAll();
            return new ResponseEntity<>(marcas, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
