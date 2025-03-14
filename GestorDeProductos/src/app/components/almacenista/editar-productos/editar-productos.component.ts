import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ProductoService } from '../../../services/crear-productos.service';
import { Producto } from '../../../models/producto.model';
import { CatalogosService } from '../../../services/formularios/catalogos.service';
import { VerProductosComponent } from '../ver-productos/ver-productos.component';
import { HistorialPrecioService } from '../../../services/historialPrecios/historialPrecios.service';
import { HistorialPrecio } from '../../../models/historial.model';
import { AlmacenistasService } from '../../../services/almacenistas/almacenistas.service';

@Component({
  selector: 'app-editar-productos',
  templateUrl: './editar-productos.component.html',
  styleUrls: ['./editar-productos.component.css']
})
export class EditarProductosComponent implements OnChanges {
  @Input() currentProducto: Producto = this.initProducto();
  currentProductoHistorial: HistorialPrecio = this.initHistoriaPrecio();
  productos: Producto[] = [];
  isEditDialogOpen: boolean = false;
  proveedorInputEdit: string = '';
  marcas: string[] = [];
  proveedores: string[] = [];
  tamanios: string[] = [];
  categorias: string[] = [];
  currentImageIndex: number = 0;
  imagenUrlInput: string = '';


  // Propiedad para almacenar el precio anterior del producto
  originalPrecio: number = 0;

  constructor(
    private productoService: ProductoService,
    private catalogosService: CatalogosService,
    private verProductos: VerProductosComponent,
    private historialService: HistorialPrecioService
  ) {
    this.loadCatalogos();
  }

  // Se utiliza ngOnChanges para detectar cuando se carga el producto y guardar el precio original
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentProducto'] && this.currentProducto) {
      this.originalPrecio = this.currentProducto.precioPieza;
    }


  }

  updateProducto(): void {
    // Obtener el historial de precios actual del producto
    this.historialService.getHistorialPorCodigoBarras(this.currentProducto.codigoBarras).subscribe(historialArray => {

      if (this.currentProducto.precioPieza != this.originalPrecio) {
        this.currentProducto.precioPieza = this.originalPrecio;
        if (!historialArray || historialArray.length === 0) {
          console.warn('No se encontró historial de precios para este producto, se creará uno nuevo.');

          // Si no existe historial, crear uno nuevo
          const nuevoHistorial: HistorialPrecio = {
            _id: '', // MongoDB generará un nuevo _id
            codigoBarras: this.currentProducto.codigoBarras,
            producto: this.currentProducto.nombreProducto,
            historialPrecios: [
              { precio: this.currentProducto.precioPieza, fechaCambio: new Date() }
            ]
          };

          // Primero actualizar el producto
          this.productoService.updateProducto(this.currentProducto).subscribe(() => {
            // Luego crear el historial de precios
            this.historialService.createHistorial(nuevoHistorial).subscribe(() => {
              console.log('Historial de precios creado correctamente.');
              this.verProductos.loadProductos();
              this.verProductos.isEditDialogOpen = false;
            });
          });

          return; // Salir de la función para evitar continuar con el código siguiente
        }

        // Si ya existe un historial, actualizarlo
        let historial = historialArray[0]; // Accede al primer historial
        let historialPrecios = historial.historialPrecios || []; // Asegurar que existe historialPrecios

        // Si hay un historial previo, actualizar la fechaFin del último precio registrado
        if (historialPrecios.length > 0) {
          historialPrecios[historialPrecios.length - 1].fechaFin = new Date();
        }

        // Agregar el nuevo precio con fecha de cambio actual
        historialPrecios.push({
          precio: this.currentProducto.precioPieza,
          fechaCambio: new Date()
        });

        // Preparar el objeto a actualizar
        const updatedHistorial: HistorialPrecio = {
          _id: historial._id,
          codigoBarras: this.currentProducto.codigoBarras,
          producto: this.currentProducto.nombreProducto,
          historialPrecios: historialPrecios
        };

        // Primero actualizar el producto
        this.productoService.updateProducto(this.currentProducto).subscribe(() => {
          // Luego actualizar el historial de precios
          this.historialService.updateHistorial(updatedHistorial).subscribe(() => {
            console.log('Historial de precios actualizado correctamente.');
            this.verProductos.loadProductos();
            this.verProductos.isEditDialogOpen = false;
          });
        });

      } else {
        this.productoService.updateProducto(this.currentProducto).subscribe(() => {
          console.log('Historial de precios actualizado correctamente.');
          this.verProductos.loadProductos();
          this.verProductos.isEditDialogOpen = false;
        });
      }
    }, error => {
      console.error('Error obteniendo historial de precios:', error);
    });
  }

  agregarProveedorEdit(): void {
    if (this.proveedorInputEdit.trim() && !this.currentProducto.proveedor.includes(this.proveedorInputEdit)) {
      this.currentProducto.proveedor.push(this.proveedorInputEdit.trim());
      this.proveedorInputEdit = '';
    } else {
      alert('El proveedor ya ha sido agregado o está vacío.');
    }
  }

  eliminarProveedorEdit(index: number): void {
    this.currentProducto.proveedor.splice(index, 1);
  }

  agregarImagen(): void {
    if (this.imagenUrlInput.trim() && !this.currentProducto.imagenUrl?.includes(this.imagenUrlInput.trim())) {
      this.currentProducto.imagenUrl?.push(this.imagenUrlInput.trim());
      alert('Imagen agregada correctamente');
      this.imagenUrlInput = '';
    } else {
      alert('La imagen ya está en la lista o el campo está vacío.');
    }
  }

  eliminarImagen(index: number): void {
    this.currentProducto.imagenUrl?.splice(index, 1);
  }

  prevImage() {
    if (this.currentProducto.imagenUrl?.length) {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.currentProducto.imagenUrl.length) % this.currentProducto.imagenUrl.length;
    }
  }

  nextImage() {
    if (this.currentProducto.imagenUrl?.length) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.currentProducto.imagenUrl.length;
    }
  }

  closeEditDialog(): void {
    this.verProductos.isEditDialogOpen = false;
  }

  loadCatalogos(): void {
    this.catalogosService.getCategorias().subscribe(data => this.categorias = data.map(c => c.nombreCategoria));
    this.catalogosService.getMarcas().subscribe(data => this.marcas = data.map(m => m.nombreMarca));
    this.catalogosService.getProveedores().subscribe(data => this.proveedores = data.map(p => p.nombreProveedor));
    this.catalogosService.getTamanios().subscribe(data => this.tamanios = data.map(t => t.nombreTamanio));
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
    };

  }

  private initHistoriaPrecio(): HistorialPrecio {
    return {
      _id: '',
      codigoBarras: '',
      historialPrecios: [{ precio: 0, fechaCambio: new Date() }],
      producto: ''
    };
  }
}
