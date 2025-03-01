package edu.utng.mx.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import edu.utng.mx.backend.documentos.Categoria;

public interface CategoriasRepository  extends  MongoRepository<Categoria, String> {

    
} 
