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
    codigoBarras: '',
    nombreProducto: '',
    stockNuevo: 0
  };

  productos: any[] = [];


  constructor(private productoService: ProductoService,private verProducto: VerProductosComponent) { }

  ngOnChanges(changes: SimpleChanges): void {
    // Verifica si el currentProducto ha cambiado y actualiza productoExistencias
    if (changes['currentProducto'] && this.currentProducto) {
      this.productoExistencias = { ...this.currentProducto }; // Copia los valores del producto
    }
  }

  private initProducto(): Producto {
    return {
      _id: '',
      codigoBarras: '',
      nombreProducto: '',
      tamano: '',
      marca: '',
      imagenUrl: '',
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
//esta recibienod ceras revisar
  actualizarStock(): void {
    if (this.cantidadSeleccionada <= 0) {
      alert('Ingresa una cantidad válida.');
      return;
    }

    if (this.productoExistencias.stockExhibe < this.cantidadSeleccionada) {
      alert('No puedes reducir más de lo que hay en stock.');
      return;
    }

    this.productoExistencias.stockExhibe -= this.cantidadSeleccionada;

    this.productoService.updateProducto(this.productoExistencias).subscribe(
      (updatedProduct) => {
        const index = this.productos.findIndex(prod => prod._id === updatedProduct._id);
        if (index !== -1) {
          this.productos[index] = updatedProduct;
          this.verProducto.loadProductos();
        }
        this.closeExistenciasDialog();
      },
      (error) => {
        console.error('Error actualizando stock:', error);
      }
    );
  }

  closeExistenciasDialog(): void {
    this.verProducto.isExistenciasDialogOpen = false;
  }
}
