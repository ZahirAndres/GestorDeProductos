package edu.utng.mx.backend.controller;

import edu.utng.mx.backend.documentos.Usuarios;
import edu.utng.mx.backend.repository.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    // Crear un nuevo usuario
    @PostMapping("/crear")
    public ResponseEntity<?> saveUsuario(@RequestBody Usuarios usuario) {
        try {
            Usuarios savedUser = usuarioRepositorio.save(usuario);
            return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Obtener todos los usuarios
    @GetMapping("/ver")
    public ResponseEntity<?> findAllUsuarios() {
        try {
            List<Usuarios> usuarios = usuarioRepositorio.findAll();
            return new ResponseEntity<>(usuarios, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Actualizar un usuario por su ObjectId
    // Revisa si el id en la URL es un String
    @PutMapping("/actualizar/{id}")
    public ResponseEntity<?> updateUsuario(@PathVariable String id, @RequestBody Usuarios usuario) {
        try {
            // Buscar al usuario por el ID
            Optional<Usuarios> usuarioExistente = usuarioRepositorio.findById(id);

            if (usuarioExistente.isPresent()) {
                // Obtener el usuario encontrado
                Usuarios userToUpdate = usuarioExistente.get();

                // Actualizar con la nueva información
                userToUpdate.setNombreUsuario(usuario.getNombreUsuario());
                userToUpdate.setApellidoPaterno(usuario.getApellidoPaterno());
                userToUpdate.setApellidoMaterno(usuario.getApellidoMaterno());
                userToUpdate.setCorreo(usuario.getCorreo());
                userToUpdate.setContrasena(usuario.getContrasena());
                userToUpdate.setRol(usuario.getRol());
                userToUpdate.setDireccion(usuario.getDireccion());

                // Guardar el usuario actualizado
                Usuarios updatedUser = usuarioRepositorio.save(userToUpdate);
                return new ResponseEntity<>(updatedUser, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Usuario no encontrado", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Eliminar un usuario por su ObjectId
    @DeleteMapping("/borrar/{id}")
    public ResponseEntity<?> deleteUsuario(@PathVariable String id) {
        try {
            // Verificar si el usuario existe
            Optional<Usuarios> usuarioExistente = usuarioRepositorio.findById(id);

            if (usuarioExistente.isPresent()) {
                // Eliminar al usuario
                usuarioRepositorio.deleteById(id);
                return new ResponseEntity<>("Usuario eliminado", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Usuario no encontrado desde backend", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}