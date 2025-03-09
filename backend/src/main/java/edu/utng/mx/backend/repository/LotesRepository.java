package edu.utng.mx.backend.repository;

import edu.utng.mx.backend.documentos.Lote;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LotesRepository extends MongoRepository<Lote, String> {

        Optional<Lote> findByCodigoLote(String codigoLote);


    @Aggregation(pipeline = {
            "{ $match: { 'producto': { $regex: ?0, $options: 'i' } } }",
            "{ $sort: { 'fechaCaducidad': -1 } }"
    })
    List<Lote> filtroLotesPorNombre(String producto);

    @Aggregation(pipeline = {
            "{ $match: { 'codigoLote': ?0 } }",
            "{ $sort: { 'fechaCaducidad': -1 } }"
    })
    List<Lote> filtroLotesPorCodigoLote(String codigoLote);


}
