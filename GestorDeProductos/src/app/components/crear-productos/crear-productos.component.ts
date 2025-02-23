import { Component } from '@angular/core';
import { Producto } from '../../models/producto.model';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/crear-productos.service';

@Component({
  selector: 'app-crear-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-productos.component.html',
  styleUrls: ['./crear-productos.component.css']

})
export class CrearProductosComponent {
  producto: Producto = {
    codigoBarras: '',
    nombreProducto: '',
    tamano: '677 ml',
    marca: '',
    categoria: '',
    precioPieza: 0,
    precioCaja: 0,
    cantidadPiezasPorCaja: 0,
    proveedor: ''
  };

  mensaje: string = '';

  constructor(private productoService: ProductoService) {}

  crearProducto(form: NgForm): void {
    if (form.valid) {
      this.productoService.createProducto(this.producto).subscribe(
        (response) => {
          this.mensaje = 'Producto creado exitosamente';
          this.producto = {
            codigoBarras: '',
            nombreProducto: '',
            tamano: '',
            marca: '',
            categoria: '',
            precioPieza: 0,
            precioCaja: 0,
            cantidadPiezasPorCaja: 0,
            proveedor: ''
          };
          form.resetForm();
        },
        (error) => {
          console.error('Error al crear producto:', error);
          this.mensaje = 'Hubo un error al crear el producto';
        }
      );
    } else {
      this.mensaje = 'Por favor, completa todos los campos correctamente.';
    }
  }
}
