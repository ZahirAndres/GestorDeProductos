package edu.utng.mx.backend.repository;

import edu.utng.mx.backend.documentos.Lote;
import edu.utng.mx.backend.documentos.Producto;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Date;

@Repository
public interface LotesRepository extends MongoRepository<Lote, String> {

    /**
     * Busca lotes por código de lote, fecha de caducidad o nombre del producto
     * DESUSO
     * 
     * @param filtro El valor a buscar en alguno de los campos
     * @return Lista de lotes ordenados por fecha de caducidad descendente
     */
    @Aggregation(pipeline = {
            "{ $match: { $and: [ " +
                    "{ $or: [ " +
                    "{ 'codigoLote': ?0 }, " +
                    "{ 'codigoLote': { $exists: false } } " +
                    "] }, " +
                    "{ $or: [ " +
                    "{ 'fechaCaducidad': ?1 }, " +
                    "{ 'fechaCaducidad': { $exists: false } } " +
                    "] }, " +
                    "{ $or: [ " +
                    "{ 'producto': { $regex: ?2, $options: 'i' } }, " +
                    "{ 'producto': { $exists: false } } " +
                    "] } " +
                    "] } }",
            "{ $sort: { 'fechaCaducidad': -1 } }"
    })
    List<Lote> filtroLotesCodigoFechaCaducidadNombre(String codigoLote, Date fechaCaducidad, String producto);

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
