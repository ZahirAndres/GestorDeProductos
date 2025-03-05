import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {
  rol: string | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.obtenerRol();
    console.log(this.rol);
  }

  obtenerRol() {
    this.rol = localStorage.getItem('rol'); 
  }

  cerrarSesion() {
    localStorage.removeItem('rol'); 
    this.rol = null; 
    this.router.navigate(['/cliente/ver-productos']); 
  }
}
