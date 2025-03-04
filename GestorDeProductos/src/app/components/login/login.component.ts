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

  constructor(private loginService: LoginService, private router: Router) { }

  login(form: NgForm) {
    if (form.valid) {
      this.loginService.login(this.usuario).subscribe(
        res => {
          console.log(res.message);
          if(res.message == 'Almacenista'){
            this.router.navigate(['/almacenista/productos/ver']);
          }else{
            this.router.navigate(['/ayudante-pasillo/abastecimiento-estantes/ver']);
          }
        },
        err => {
          console.error(err);
        }
      );
    }
  }
}


