package edu.utng.mx.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import edu.utng.mx.backend.documentos.Usuarios;
import edu.utng.mx.backend.services.InicioSesionService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private InicioSesionService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuarios usuario) {
        String rol = usuarioService.autenticarUsuario(usuario.getCorreo(), usuario.getContrasena());
        if (rol != null) {
            return ResponseEntity.ok(new AuthResponse(rol));  // Devuelve el rol en formato JSON
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                 .body(new AuthResponse("Invalid credentials")); // Devuelve el mensaje de error en formato JSON
        }
    }
}

class AuthResponse {
    private String message;

    public AuthResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
