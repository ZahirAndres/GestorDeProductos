package edu.utng.mx.backend.repository;

import edu.utng.mx.backend.documentos.Producto;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface FiltrosAyudanteRepository extends MongoRepository<Producto, String> {

    @Aggregation(pipeline = {
            "{ $addFields: { faltanteEnEstante: { $subtract: [ '$stockExhibe', '$existenciaExhibida' ] } } }",
            "{ $match: { 'codigoBarras': { $regex: ?0, $options: 'i' }, $expr: { $lte: [ '$existenciaExhibida', '$stockExhibe' ] } } }",
            "{ $sort: { faltanteEnEstante: -1 } }"
    })
    List<Producto> findByCodigoBarras(String codigoBarras);

    @Aggregation(pipeline = {
            "{ $addFields: { faltanteEnEstante: { $subtract: [ '$stockExhibe', '$existenciaExhibida' ] } } }",
            "{ $match: { 'nombreProducto': { $regex: ?0, $options: 'i' }, $expr: { $lte: [ '$existenciaExhibida', '$stockExhibe' ] } } }",
            "{ $sort: { faltanteEnEstante: -1 } }"
    })
    List<Producto> findByNombreProducto(String nombreProducto);

    @Aggregation(pipeline = {
            "{ $addFields: { faltanteEnEstante: { $subtract: [ '$stockExhibe', '$existenciaExhibida' ] } } }",
            "{ $match: { 'categoria': ?0, $expr: { $lte: [ '$existenciaExhibida', '$stockExhibe' ] } } }",
            "{ $sort: { faltanteEnEstante: -1 } }"
    })
    List<Producto> findByCategoria(String categoria);

    @Aggregation(pipeline = {
            "{ $addFields: { faltanteEnEstante: { $subtract: [ '$stockExhibe', '$existenciaExhibida' ] } } }",
            "{ $match: { $expr: { $lte: [ '$existenciaExhibida', '$stockExhibe' ] } } }",
            "{ $sort: { faltanteEnEstante: -1 } }"
    })
    List<Producto> findByExistenciaExhibida();

    @Aggregation(pipeline = {
            "{ $addFields: { faltanteEnEstante: { $subtract: [ '$stockExhibe', '$existenciaExhibida' ] } } }",
            "{ $match: { $and: [{ $or: [ { 'categoria': ?0 }, { 'nombreProducto': ?0 } ] }, { $expr: { $lte: [ '$existenciaExhibida', '$stockExhibe' ] } }] } }",
            "{ $sort: { faltanteEnEstante: -1 } }"
    })
    List<Producto> findByNombreYCategoria(String filtro);
}
