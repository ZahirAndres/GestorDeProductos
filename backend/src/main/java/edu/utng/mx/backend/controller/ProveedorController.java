package edu.utng.mx.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import edu.utng.mx.backend.repository.ProveedorRepository;
import edu.utng.mx.backend.documentos.Proveedor;
import edu.utng.mx.backend.documentos.Producto;

@RestController
@RequestMapping("/api/formularios/proveedores")
public class ProveedorController {

    @Autowired
    private ProveedorRepository provRepo;
    /**
     * Obtener todas las proveedores
     */
    @GetMapping("/ver")
    public ResponseEntity<?> findAllProveedores() {
        try {
            List<Proveedor> proveedores = provRepo.findAll();
            return new ResponseEntity<>(proveedores, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
