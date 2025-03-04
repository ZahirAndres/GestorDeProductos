import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',  // o el nombre del componente donde tengas el <app-tool-bar>
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'GestorProducto';
  isLoginPage: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Detecta la ruta y establece la condición
    this.router.events.subscribe(() => {
      this.isLoginPage = this.router.url === '/login';
    });
  }
}


