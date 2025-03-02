package edu.utng.mx.backend.repository;

import edu.utng.mx.backend.documentos.Producto;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import java.util.List;

public interface FiltrosCliente extends MongoRepository<Producto, String> {

    
    @Query("{ 'nombreProducto': { $regex: ?0, $options: 'i' }, 'existenciaExhibida': { $gt: 0 } }")
    List<Producto> findByNombreProducto(String nombreProducto);

    
    @Query("{ 'categoria': ?0, 'existenciaExhibida': { $gt: 0 } }")
    List<Producto> findByCategoria(String categoria);

    
    @Query("{ $and: [{ 'categoria': ?0 }, { 'nombreProducto': { $regex: ?1, $options: 'i' } }, { 'existenciaExhibida': { $gt: 0 } }] }")
    List<Producto> findByCategoriaYNombre(String categoria, String nombreProducto);
}
