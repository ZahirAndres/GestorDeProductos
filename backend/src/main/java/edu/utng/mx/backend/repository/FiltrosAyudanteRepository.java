package edu.utng.mx.backend.repository;

import edu.utng.mx.backend.documentos.Producto;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface FiltrosAyudanteRepository extends MongoRepository<Producto, String> {

        /**
         * Me manda todos los productos por debajo de su stockExibhe,
         * Busca los articulos por su codigo de barras y los odena por el numero de
         * existencias faltantes del
         * mayor al menor
         * 
         * @param codigoBarras
         * @return
         */
        @Aggregation(pipeline = {
                        "{ $addFields: { faltanteEnEstante: { $subtract: [ '$stockExhibe', '$existenciaExhibida' ] } } }",
                        "{ $match: { 'codigoBarras': { $regex: ?0, $options: 'i' }, $expr: { $lte: [ '$existenciaExhibida', '$stockExhibe' ] } } }",
                        "{ $sort: { faltanteEnEstante: -1 } }"
        })
        List<Producto> findByCodigoBarras(String codigoBarras);

        /**
         * Me manda todos los productos por debajo de su stockExibhe,
         * Busca los productos por su nombre y los odena por el numero de
         * existencias faltantes del
         * mayor al menor
         * 
         * @param nombreProducto
         * @return
         */
        @Aggregation(pipeline = {
                        "{ $addFields: { faltanteEnEstante: { $subtract: [ '$stockExhibe', '$existenciaExhibida' ] } } }",
                        "{ $match: { 'nombreProducto': { $regex: ?0, $options: 'i' }, $expr: { $lte: [ '$existenciaExhibida', '$stockExhibe' ] } } }",
                        "{ $sort: { faltanteEnEstante: -1 } }"
        })
        List<Producto> findByNombreProducto(String nombreProducto);

        /**
         * Me manda todos los productos por debajo de su stockExibhe,
         * Busca los productos por su categoria y los odena por el numero de
         * existencias faltantes del
         * mayor al menor
         * 
         * @param categoria
         * @return
         */
        @Aggregation(pipeline = {
                        "{ $addFields: { faltanteEnEstante: { $subtract: [ '$stockExhibe', '$existenciaExhibida' ] } } }",
                        "{ $match: { 'categoria': ?0, $expr: { $lte: [ '$existenciaExhibida', '$stockExhibe' ] } } }",
                        "{ $sort: { faltanteEnEstante: -1 } }"
        })
        List<Producto> findByCategoria(String categoria);

        /**
         * Me manda todos los productos por debajo de su stockExibhe y los ordena por el
         * numero de
         * existencias faltantes del
         * mayor al menor
         * 
         * @return
         */
        @Aggregation(pipeline = {
                        "{ $addFields: { faltanteEnEstante: { $subtract: [ '$stockExhibe', '$existenciaExhibida' ] } } }",
                        "{ $match: { $expr: { $lt: [ '$existenciaExhibida', '$stockExhibe' ] } } }",
                        "{ $sort: { faltanteEnEstante: -1 } }"
        })
        List<Producto> findByExistenciaExhibida();

        /**
         * 
         * @param filtro
         * @return
         */
        @Aggregation(pipeline = {
                        "{ $addFields: { faltanteEnEstante: { $subtract: [ '$stockExhibe', '$existenciaExhibida' ] } } }",
                        "{ $match: { $and: [{ $or: [ { 'categoria': ?0 }, { 'nombreProducto': ?0 } ] }, { $expr: { $lte: [ '$existenciaExhibida', '$stockExhibe' ] } }] } }",
                        "{ $sort: { faltanteEnEstante: -1 } }"
        })
        List<Producto> findByNombreYCategoria(String filtro);

}