package main.java.edu.utng.mx.backend.repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

import edu.utng.mx.backend.documentos.Lote;

@Repository
public interface LoteRepository extends MongoRepository<Lote, String> {
    List<Lote> findByCategoria(String categoria);

    List<Lote> findByFecha(String fecha);

    List<Lote> findByNombreContainingIgnoreCase(String nombre);

}