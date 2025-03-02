package main.java.edu.utng.mx.backend.services;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import edu.utng.mx.backend.documentos.Lote;
import edu.utng.mx.backend.repository.LoteRepository;

@Service
public class LoteService {

    @Autowired
@Service
public class LoteService {

    @Autowired
    private LoteRepository loteRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public Lote crearLote(Lote lote) {
        return loteRepository.save(lote); 
    
        // Agregar filtros dinámicamente
        if (categoria != null && !categoria.isEmpty()) {
            query.addCriteria(Criteria.where("categoria").is(categoria));
        }
        if (fecha != null && !fecha.isEmpty()) {
            query.addCriteria(Criteria.where("fecha").is(fecha));
        }
        if (nombre != null && !nombre.isEmpty()) {
            query.addCriteria(Criteria.where("nombre").regex(nombre, "i"));
        }

        // Ejecutar la consulta
        return mongoTemplate.find(query, Lote.class);
    }
}
}