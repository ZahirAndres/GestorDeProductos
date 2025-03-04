package edu.utng.mx.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import edu.utng.mx.backend.documentos.Usuarios;

public interface UsuarioRepositorio extends MongoRepository<Usuarios, String> {
    
    // Método para buscar usuario por correo
    Usuarios findByCorreo(String correo);
    
    // Consulta personalizada usando @Query para correo y contraseña
    @Query("{'correo': ?0, 'contrasena': ?1}")
    Usuarios findByCorreoAndContrasena(String correo, String contraseña);
}
