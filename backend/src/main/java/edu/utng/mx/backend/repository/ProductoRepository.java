package edu.utng.mx.backend.documentos;
import org.springframework.data.mongodb.repository.MongoRepository;
import edu.utng.mx.backend.documentos.Producto;

public interface ProductoRepository extends MongoRepository<Producto, String> { }

