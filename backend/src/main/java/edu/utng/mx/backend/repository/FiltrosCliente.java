package edu.utng.mx.backend.repository;

import edu.utng.mx.backend.documentos.Producto;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import java.util.List;

public interface FiltrosCliente extends MongoRepository<Producto, String> {

    @Query("{ 'existenciaExhibida': { $gt: 0 } }")
    List<Producto> productosClienteDefecto();
    
    @Query("{ 'nombreProducto': { $regex: ?0, $options: 'i' } }")
    List<Producto> findByNombreProducto(String nombreProducto);

    
    @Query("{ 'categoria': ?0 }")
    List<Producto> findByCategoria(String categoria);

    
    @Query("{ $and: [{ 'categoria': ?0 }, { 'nombreProducto': { $regex: ?1, $options: 'i' } }] }")
    List<Producto> findByCategoriaYNombre(String categoria, String nombreProducto);
}
