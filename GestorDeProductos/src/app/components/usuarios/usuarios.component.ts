import { Component } from '@angular/core';
import { UsuarioServiceService } from '../../services/usuario-service.service';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model'; // Asegúrate de importar el modelo Usuario

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  usuarios: Usuario[] = []; // Cambié productos a usuarios para mantener la consistencia

  constructor(private usuarioServices: UsuarioServiceService, private router: Router) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    

  }

  cargarUsuarios(): void {
    this.usuarioServices.getUsuarios().subscribe(
      (response: Usuario[]) => {
        this.usuarios = response; // Deberías recibir los usuarios con el campo id ya presente
      },
      (error) => {
        console.error('Error al cargar usuarios:', error);
      }
    );
  }
  
  
  
  borrarUsuario(id: string): void {
    this.usuarioServices.deleteUsuario(id).subscribe(
      (response) => {
        this.cargarUsuarios(); // Recarga la lista de usuarios
      },
      (error) => {
        console.error('Error al borrar usuario:', error); // Muestra el error si no se puede eliminar
      }
    );
  }
  

  irACrearUsuario(): void {
    this.router.navigate(['/usuarios/crear']); // Navega a la ruta de creación de usuario
  }
}
