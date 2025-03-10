package edu.utng.mx.backend.repository;

import edu.utng.mx.backend.documentos.Producto;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface FiltrosAlmacenistaRepository extends MongoRepository<Producto, String> {


    // Buscar productos por nombre (sin distinción de mayúsculas/minúsculas)
    @Aggregation(pipeline = {
            "{ $match: { 'nombreProducto': { $regex: ?0, $options: 'i' } } }",
            "{ $sort: { 'nombreProducto': 1 } }"
    })
    List<Producto> findByNombreProducto(String nombreProducto);

    // Buscar productos por categoría
    @Aggregation(pipeline = { 
            "{ $match: { 'categoria': { $regex: ?0, $options: 'i' } } }",
            "{ $sort: { 'nombreProducto': 1 } }"
    })
    List<Producto> findByCategoria(String categoria);

    // Buscar productos por codigo de barras
    @Aggregation(pipeline = {
            "{ $match: { 'codigoBarras': { $regex: ?0, $options: 'i' } } }",
    })
    List<Producto> findByCodigoBarras(String codigoBarras);

    // Buscar un producto por categoria de barras y nombre
    @Aggregation(pipeline = {
            "{ $match: { " +
                    "'$or': [ " +
                    "{ 'categoria': ?0 }, " +
                    "{ 'nombreProducto': { $regex: ?1, $options: 'i' } } " +
                    "] " +
                    "} }",
            "{ $sort: { 'nombreProducto': 1 } }"
    })
    List<Producto> findByCategoriaYNombre(String filtro);

}
