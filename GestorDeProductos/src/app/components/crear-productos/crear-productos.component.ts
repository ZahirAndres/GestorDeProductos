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
    tamano: '',
    marca: '',
    imagenUrl: [], 
    categoria: '',
    precioPieza: 0,
    precioCaja: 0,
    cantidadPiezasPorCaja: 0,
    proveedor: [],
    stockExhibe: 0,
    existenciaExhibida: 0,
    stockAlmacen: 0,
    cantidadAlmacen: 0
  };

  mensaje: string = '';
  proveedorInput: string = ''; // Para manejar la entrada de proveedores

  constructor(private productoService: ProductoService) {}

  crearProducto(form: NgForm): void {
    if (form.valid) {
      this.productoService.createProducto(this.producto).subscribe(
        (response) => {
          this.mensaje = 'Producto creado exitosamente';
          this.resetFormulario(form);
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

  agregarProveedor(): void {
    if (this.proveedorInput.trim()) {
      this.producto.proveedor.push(this.proveedorInput.trim());
      this.proveedorInput = '';
    }
  }

  eliminarProveedor(index: number): void {
    this.producto.proveedor.splice(index, 1);
  }

  resetFormulario(form: NgForm): void {
    this.producto = {
      codigoBarras: '',
      nombreProducto: '',
      tamano: '',
      marca: '',
      imagenUrl: [],
      categoria: '',
      precioPieza: 0,
      precioCaja: 0,
      cantidadPiezasPorCaja: 0,
      proveedor: [],
      stockExhibe: 0,
      existenciaExhibida: 0,
      stockAlmacen: 0,
      cantidadAlmacen: 0
    };
    form.resetForm();
  }
}
