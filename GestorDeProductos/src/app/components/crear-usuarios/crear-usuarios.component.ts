import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { UsuarioServiceService } from '../../services/usuario-service.service';

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.css']  // Asegúrate de que el archivo CSS esté correctamente nombrado
})
export class CrearUsuariosComponent {
  usuario: Usuario = {
    nombreUsuario: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    correo: '',
    contrasena: '',
    rol: '',
    direccion: ''
  };

  mensaje: string = '';

  constructor(private usuarioService: UsuarioServiceService) { }

  crearUsuario(form: NgForm): void {
    if (form.valid) {
      this.usuarioService.createUsuario(this.usuario).subscribe(
        (response) => {
          this.mensaje = 'Usuario creado exitosamente';
          this.usuario = {
            nombreUsuario: '',
            apellidoPaterno: '',
            apellidoMaterno: '',
            correo: '',
            contrasena: '',
            rol: '',
            direccion: ''
          };
          form.resetForm();
        },
        (error) => {
          console.error('Error al crear usuario:', error);
          this.mensaje = 'Hubo un error al crear el usuario';
        }
      );
    } else {
      this.mensaje = 'Por favor, completa todos los campos correctamente.';
    }
  }
}
