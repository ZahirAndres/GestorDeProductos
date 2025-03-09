package edu.utng.mx.backend.repository;

import edu.utng.mx.backend.documentos.Proveedor;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProveedorRepository extends MongoRepository<Proveedor, String> {

    @Query("{ 'nombreProveedor': { $in: ?0 } }")
    List<Proveedor> provedoresDelProducto(List<String> nombresProveedores);
}
