package edu.utng.mx.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.utng.mx.backend.documentos.Usuarios;
import edu.utng.mx.backend.repository.UsuarioRepositorio;

@Service
public class InicioSesionService {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    public String autenticarUsuario(String correo, String contrasena){
        Usuarios usuario = usuarioRepositorio.findByCorreoAndContrasena(correo, contrasena);
        if (usuario != null) {
            return usuario.getRol();  // Regresar el rol si las credenciales son correctas
        }
        return null; 
    }
}
