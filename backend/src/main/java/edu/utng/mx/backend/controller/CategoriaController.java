package edu.utng.mx.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.utng.mx.backend.repository.CategoriasRepository;
import edu.utng.mx.backend.documentos.Categoria;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {
    @Autowired
    private CategoriasRepository categoriasRepository; 

    @GetMapping("/ver") 
    public ResponseEntity<?> findAllCategorias(){
        try{
            List<Categoria> categorias = categoriasRepository.findAll();
            return new ResponseEntity<List<Categoria>>(categorias, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
