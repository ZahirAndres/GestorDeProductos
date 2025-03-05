package edu.utng.mx.backend.repository;

import edu.utng.mx.backend.documentos.Producto;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import java.util.List;

public interface FiltrosCliente extends MongoRepository<Producto, String> {

    /**
     * Me manda todos los productos con una existencia mayor a 0
     * @return
     */
    @Query("{ 'existenciaExhibida': { $gt: 0 } }")
    List<Producto> productosClienteDefecto();
    
    /**
     * Me manda todos los productos con una existencia mayor a 0,
     * y los filtra por nombre
     * @param nombreProducto
     * @return
     */
    @Query("{ 'nombreProducto': { $regex: ?0, $options: 'i' } }")
    List<Producto> findByNombreProducto(String nombreProducto);

    /**
     * Me manda todos los productos con una existencia mayor a 0,
     * y los filtra por categoria
     * @param categoria
     * @return
     */
    @Query("{ 'categoria': ?0 }")
    List<Producto> findByCategoria(String categoria);

    /**
     * Me manda todos los productos con una existencia mayor a 0,
     * Y los busca por categoria y nombre
     * @param categoria
     * @param nombreProducto
     * @return
     */
    @Query("{ $and: [{ 'categoria': ?0 }, { 'nombreProducto': { $regex: ?1, $options: 'i' } }] }")
    List<Producto> findByCategoriaYNombre(String categoria, String nombreProducto);
}
