// Componente para mostrar los detalles de un producto específico, incluyendo información sobre los proveedores.
// Permite también cerrar el diálogo de visualización del producto.
import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../../../models/producto.model';
import { VerProductosClienteComponent } from '../ver-productos-cliente/ver-productos-cliente.component';
import { CatalogosService } from '../../../services/formularios/catalogos.service';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.css'] 
})
export class VerProductoComponent implements OnInit {
  // Recibe el producto seleccionado como entrada para mostrar sus detalles
  @Input() currentProducto: Producto = this.initProducto();
  // Lista de proveedores del producto, inicialmente con valores predeterminados
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

  /**
   * Método que se ejecuta al inicializar el componente.
   * Obtiene la información de los proveedores y el rol del usuario.
   */
  ngOnInit(): void {
    this.getProvedores();
    this.obtenerRol();
  }

  /**
   * Método para cerrar el diálogo de visualización del producto en el componente padre.
   * Cambia el estado `isProducto` a `false` en el componente `VerProductosClienteComponent` para cerrar el diálogo.
   */
  closeEditDialog(): void {
    this.verProdcutos.isProducto = false;
  }

  /**
   * Método privado para inicializar un objeto Producto con valores predeterminados.
   * @returns Un objeto Producto vacío con valores inicializados.
   */
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

  /**
   * Método para obtener los proveedores del producto actual.
   * Si el producto tiene proveedores asociados, hace una solicitud para obtener los datos de esos proveedores.
   */
  getProvedores() {
    if (this.currentProducto.proveedor && this.currentProducto.proveedor.length > 0) {
      const nombresProveedores = this.currentProducto.proveedor.map(p => p);
    
      this.verProveedores.obtenerProveedoresPorProducto(nombresProveedores).subscribe(
        (response) => {
          this.proveedores = response;
        },
        (error) => {
          console.error('Error al cargar proveedores:', error);
        }
      );
    } else {
      console.log('No hay proveedores disponibles para este producto.');
    }
  }
  

  /**
   * Método para obtener el rol del usuario desde el almacenamiento local.
   * Almacena el valor del rol en la variable `rol`.
   */
  obtenerRol() {
    this.rol = localStorage.getItem('rol'); 
  }
}
