import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ProductoService } from '../../../services/crear-productos.service';
import { Producto } from '../../../models/producto.model';
import { VerProductosComponent } from '../ver-productos/ver-productos.component';

@Component({
  selector: 'app-existencias',
  templateUrl: './existencias.component.html',
  styleUrls: ['./existencias.component.css']
})
export class ExistenciasComponent implements OnChanges {
  @Input() currentProducto: Producto = this.initProducto(); // Recibe el producto desde el componente padre

  isExistenciasDialogOpen: boolean = false;
  cantidadSeleccionada: number = 0;
  productoExistencias: any = {
    _id: '',
    codigoBarras: '',
    nombreProducto: '',
    stockNuevo: 0
  };

  productos: any[] = [];


  constructor(private productoService: ProductoService, private verProducto: VerProductosComponent) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentProducto'] && this.currentProducto) {
      console.log('Producto recibido:', this.currentProducto);
      this.productoExistencias._id = this.currentProducto._id; 
      this.productoExistencias.codigoBarras = this.currentProducto.codigoBarras;
      this.productoExistencias.nombreProducto = this.currentProducto.nombreProducto;
    }
  }
  


  private initProducto(): Producto {
    return {
      _id: '',
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
  }


  actualizarStock(): void {
    try {
      if (this.currentProducto.cantidadAlmacen <= 0) {
        alert('La cantidad de almacen no puede ser menor o igual a 0');
      }

      // Imprime los valores para verificar que _id está presente
      this.productoExistencias._id = this.currentProducto.codigoBarras;
      console.log('ID del producto:', this.productoExistencias._id);
      console.log('Código de barras:', this.productoExistencias.codigoBarras);

      if (!this.productoExistencias._id) {
        alert('ID del producto es necesario');
        return; // Detén la ejecución si no hay ID
      }

      this.productoService.updateStock(this.productoExistencias._id, this.productoExistencias.stockNuevo).subscribe(
        (response) => {
          console.log('Stock actualizado:', response);
          this.verProducto.isExistenciasDialogOpen = false;
        },
        (error) => {
          console.error('Error al actualizar stock:', error);
          this.verProducto.isExistenciasDialogOpen = false;
        }
      );
    } catch (error) {
      console.error('Error en actualizarStock:', error);
      this.verProducto.isExistenciasDialogOpen = false;
    }
  }


  closeExistenciasDialog(): void {
    this.verProducto.isExistenciasDialogOpen = false;
  }
}
