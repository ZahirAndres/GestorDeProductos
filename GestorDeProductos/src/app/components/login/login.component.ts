import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario: any = {
    correo: '',
    contrasena: '' 
  };

  private readonly ROL_KEY = 'rol';
  loginError: string = '';

  constructor(private loginService: LoginService, private router: Router) { }

  /**
   * Método que se ejecuta cuando el usuario intenta iniciar sesión.
   * Valida el formulario y si es válido, realiza la autenticación a través del servicio LoginService.
   * Si las credenciales son correctas, redirige al usuario según su rol.
   * Si ocurre un error, muestra un mensaje de error.
   * 
   * @param form El formulario de login que contiene las credenciales del usuario.
   */
  login(form: NgForm) {
    if (form.valid) {
      this.loginService.login(this.usuario).subscribe(
        res => {
          if (res && res.message) { 
            this.loginError = '';
            localStorage.setItem(this.ROL_KEY, res.message);
            if (res.message === 'Almacenista') {
              this.router.navigate(['/almacenista/productos/ver']);
            } else {
              this.router.navigate(['/ayudante-pasillo/abastecimiento-estantes/ver']);
            }
          } else {
            console.error('Error: Respuesta del servidor no válida');
            this.loginError = 'Credenciales incorrectas. Por favor, re ingrese sus credenciales.';
          }
        },
        err => {
          console.error('Error en el login:', err);
          this.loginError = 'Credenciales incorrectas. Por favor, re ingrese sus credenciales.';
        }
      );
    }
  }
}
