package edu.utng.mx.backend.repository;

import edu.utng.mx.backend.documentos.Tamanio;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TamanioRepository extends MongoRepository<Tamanio, String> {

}
