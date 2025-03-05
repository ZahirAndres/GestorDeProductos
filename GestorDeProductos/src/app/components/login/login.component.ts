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

  constructor(private loginService: LoginService, private router: Router) { }

  login(form: NgForm) {
    if (form.valid) {
      this.loginService.login(this.usuario).subscribe(
        res => {
          if (res && res.message) {  // Verificamos que 'res' y 'res.message' existen
            localStorage.setItem(this.ROL_KEY, res.message);
            
            if (res.message === 'Almacenista') {
              this.router.navigate(['/almacenista/productos/ver']);
            } else {
              this.router.navigate(['/ayudante-pasillo/abastecimiento-estantes/ver']);
            }
          } else {
            console.error('Error: Respuesta del servidor no válida');
          }
        },
        err => {
          console.error('Error en el login:', err);
        }
      );
    }
  }
  
}


