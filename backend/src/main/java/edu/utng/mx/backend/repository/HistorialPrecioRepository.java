package edu.utng.mx.backend.repository;

import edu.utng.mx.backend.documentos.HistorialPrecio;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface HistorialPrecioRepository extends MongoRepository<HistorialPrecio, String> {

    @Query(value = "{ 'codigoBarras' : ?0 }")
    Optional<HistorialPrecio> encontrarPorCodigoBarras(String codigoBarras);

    @Query(value = "( 'CodigoBarras' : ?0 )")
    List<HistorialPrecio> encontrarTodosPorCodigoBarras(String codigoBarras);

    @Transactional
    void deleteByCodigoBarras(String codigoBarras);

    @Query(value = "{ 'codigoBarras' : ?0 }", sort = "{ 'historialPrecios.fechaCambio' : -1 }")
    Optional<HistorialPrecio> encontrarUltimoHistorialPorCodigoBarras(String codigoBarras);

}
