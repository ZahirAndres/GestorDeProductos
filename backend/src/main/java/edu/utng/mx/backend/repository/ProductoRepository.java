package edu.utng.mx.backend.repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import edu.utng.mx.backend.documentos.Producto;

public interface ProductoRepository extends MongoRepository<Producto, String> { }

