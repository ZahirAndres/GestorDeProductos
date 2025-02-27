import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/crear-productos.service';
import { Router } from '@angular/router';
import { Producto } from '../../../models/producto.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-abastecimiento',
  templateUrl: './abastecimiento.component.html',
  styleUrls: ['./abastecimiento.component.css']
})
export class AbastecimientoComponent implements OnInit {
  productos: Producto[] = []; // Lista de productos

  constructor(private productoService: ProductoService, private router: Router) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.getProductos().subscribe(
      (response: Producto[]) => {
        console.log('Productos:', response);
        this.productos = response.map(producto => ({ ...producto, mostrarFormulario: false, cantidadAgregada: 0 }));
      },
      (error) => {
        console.error('Error al cargar productos:', error);
      }
    );
  }

  actualizarCantidad(form: NgForm, producto: Producto): void {
    if (form.valid) {
      if(producto.cantidadAgregada){
      producto.existenciaExhibida += producto.cantidadAgregada; 
      this.productoService.updateProducto(producto).subscribe(
        (response) => {
          console.log('Producto actualizado:', response);
          producto.cantidadAgregada = 0;
          form.resetForm();
          producto.mostrarFormulario = false; 
        },
        (error) => {
          console.error('Error al actualizar producto:', error);
        }
      );
    } else {
      console.warn("El formulario no es válido");
    }
  }
  }

  toggleFormulario(producto: Producto): void {
    this.productos.forEach(p => {
      if (p.mostrarFormulario !== producto.mostrarFormulario) {
        p.mostrarFormulario = false;
      }
    });
    producto.mostrarFormulario = !producto.mostrarFormulario;
  }
}
