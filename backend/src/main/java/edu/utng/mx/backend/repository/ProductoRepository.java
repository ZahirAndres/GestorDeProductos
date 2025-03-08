package edu.utng.mx.backend.repository;

import edu.utng.mx.backend.documentos.Producto;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;
@Repository
public interface ProductoRepository extends MongoRepository<Producto, String> {

    @Query(value = "{ 'codigoBarras' : ?0 }")
    Optional<Producto> encontrarPorCodigoBarras(String codigoBarras);

    
}
