package edu.utng.mx.backend.repository;

import edu.utng.mx.backend.documentos.Producto;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import java.util.List;

public interface FiltrosAyudanteRepository extends MongoRepository<Producto, String> {
    @Query("{ 'codigoBarras': { $regex: ?0, $options: 'i' }, $expr: { $lte: [ '$existenciaExhibida', '$stockExhibe' ] } }")
    List<Producto> findByCodigoBarras(String codigoBarras);

    @Query("{ 'nombreProducto': { $regex: ?0, $options: 'i' }, $expr: { $lte: [ '$existenciaExhibida', '$stockExhibe' ] } }")
    List<Producto> findByNombreProducto(String nombreProducto);

    @Query("{ 'categoria': ?0, $expr: { $lte: [ '$existenciaExhibida', '$stockExhibe' ] } }")
    List<Producto> findByCategoria(String categoria);

    @Query("{$and: [{ $or: [ { 'categoria': ?0 }, { 'nombreProducto': ?0 } ] }, { $expr: { $lte: [ '$existenciaExhibida', '$stockExhibe' ] } }]}")
    List<Producto> findByNombreYCategoria(String filtro);

}
