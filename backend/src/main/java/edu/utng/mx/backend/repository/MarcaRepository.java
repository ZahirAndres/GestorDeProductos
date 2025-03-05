package edu.utng.mx.backend.repository;

import edu.utng.mx.backend.documentos.Marca;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface MarcaRepository extends MongoRepository<Marca, String> {

}
