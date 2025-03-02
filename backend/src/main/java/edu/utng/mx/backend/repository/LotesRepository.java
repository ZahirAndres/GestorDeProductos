package edu.utng.mx.backend.repository;

import edu.utng.mx.backend.documentos.Lote;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LotesRepository extends MongoRepository<Lote, String> {

    /**
     * Busca lotes por código de lote, fecha de caducidad o nombre del producto
     * @param filtro El valor a buscar en alguno de los campos
     * @return Lista de lotes ordenados por fecha de caducidad descendente
     */
    @Aggregation(pipeline = {
            "{ $match: {$and : [" +
                "{ $or: [ " +
                    "{'codigoLote' : { ?0}, " +
                    "{ ?0 : {$exists : false}} " +
                "]}, " +
                "{ $or: [ " +
                    "{'fechaCaducidad' : { ?1}, " +
                    "{ ?1 : {$exists : false}} " +
                "]}, " +
                "{ $or: [ " +
                    "{'producto' : { $regex : ?2, $options: 'i' } }, " +
                    "{ ?2 : {$exists : false}} " +
                "]}" +
            "]}",
            "{ $sort: {fechaCaducidad: -1}}"
    })  
    List<Lote> filtroLotesCodigoFechaCaducidadNombre(String codigoLote, String fechaCaducidad, String producto);
}
