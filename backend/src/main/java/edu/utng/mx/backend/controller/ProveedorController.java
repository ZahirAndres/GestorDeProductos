package edu.utng.mx.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.Collections;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import edu.utng.mx.backend.repository.ProveedorRepository;
import edu.utng.mx.backend.documentos.Proveedor;

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

@GetMapping("ver/byProducto")
public ResponseEntity<?> proveedorByProducto(@RequestParam(required = false) List<String> nombresProveedores) {
    try {
        if (nombresProveedores == null || nombresProveedores.isEmpty()) {
            return ResponseEntity.ok(Collections.emptyList()); // Retornar lista vacía si no hay nombres
        }

        List<Proveedor> provedores = provRepo.provedoresDelProducto(nombresProveedores);
        return ResponseEntity.ok(provedores);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }
}

    

}
