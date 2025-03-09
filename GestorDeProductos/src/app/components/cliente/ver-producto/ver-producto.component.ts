import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../../../models/producto.model';
import { VerProductosClienteComponent } from '../ver-productos-cliente/ver-productos-cliente.component';
import { CatalogosService } from '../../../services/formularios/catalogos.service';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.css']
})

export class VerProductoComponent implements OnInit{
  @Input() currentProducto: Producto = this.initProducto();
  proveedores: any[] = [{
    nombreProveedor: 'Código de barras no disponible',
    telefono: ['No disponible'],
    correo: 'No disponible',
    direccion: 'No disponible'
  }];
  rol: string | null = null;
  


  constructor(
    private verProdcutos: VerProductosClienteComponent,
    private verProveedores: CatalogosService

  ) { }

  ngOnInit(): void {
      this.getProvedores();
      this.obtenerRol();
  }

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
      imagenUrl: [],
      categoria: '',
      precioPieza: 0,
      precioCaja: 0,
      cantidadPiezasPorCaja: 0,
      proveedor: [],
      stockExhibe: 0,
      existenciaExhibida: 0,
      stockAlmacen: 0,
      cantidadAlmacen: 0,

      
      mensajeExistencia: '',
      colorMensaje: '',
      mensajeExistenciaAlmacen: '',
      colorMensajeAlmacen: ''
    };
  }

  getProvedores() {
    if (this.currentProducto.proveedor.length > 0) {
      const nombresProveedores = this.currentProducto.proveedor.map(p => p);
  
      this.verProveedores.obtenerProveedoresPorProducto(nombresProveedores).subscribe(
        (response) => {
          this.proveedores = response;
        },
        (error) => {
          console.error('Error al cargar proveedores:', error);
        }
      );
    }
  }
  
    obtenerRol() {
      this.rol = localStorage.getItem('rol'); 
    }
}

