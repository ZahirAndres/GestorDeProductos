package edu.utng.mx.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import edu.utng.mx.backend.documentos.Usuarios;

public interface UsuarioRepositorio extends MongoRepository<Usuarios, String> {

}
