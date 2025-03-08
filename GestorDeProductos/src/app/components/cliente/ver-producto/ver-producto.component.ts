import { Component, Input } from '@angular/core';
import { Producto } from '../../../models/producto.model';
import { VerProductosClienteComponent } from '../ver-productos-cliente/ver-productos-cliente.component';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.css']
})

export class VerProductoComponent {
  @Input() currentProducto: Producto = this.initProducto();

  constructor(
    private verProdcutos: VerProductosClienteComponent

  ) {}

  closeEditDialog(): void {
    this.verProdcutos.isProducto = false;
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
      cantidadAlmacen: 0,
      mensajeExistencia:'',
      colorMensaje:'',
      mensajeExistenciaAlmacen:'',
      colorMensajeAlmacen:''
    };
  }
}
