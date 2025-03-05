package edu.utng.mx.backend.repository;

import edu.utng.mx.backend.documentos.Proveedor;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ProveedorRepository extends MongoRepository<Proveedor, String> {

}
