import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductoService } from '../../services/crear-productos.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit { 
  constructor (private productoServices: ProductoService, private router: Router){}
  productos: any[] = [];

  ngOnInit(): void {
      this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoServices.getProductos().subscribe(
      (response: any) => {
        console.log('Productos:', response);  // Revisa la estructura de la respuesta aquí
        this.productos = response;
      },
      (error) => {
        console.error('Error al cargar productos:', error);  // Verifica el error si hay uno
      }
    );
    
  }

  borrarProducto(id: string): void {
    this.productoServices.deteleteProducto(id).subscribe(
      () => {
        this.cargarProductos();
      },
      (error) => {
        console.error('Error al borrar producto:', error);
      }
    );
  }

  irACrearProducto() {
    this.router.navigate(['/productos/crear']);
  }

}
