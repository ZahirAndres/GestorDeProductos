import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ProductoService } from '../../../services/crear-productos.service';
import { Producto } from '../../../models/producto.model';
import { CatalogosService } from '../../../services/formularios/catalogos.service';
import { VerProductosComponent } from '../ver-productos/ver-productos.component';
import { HistorialPrecioService } from '../../../services/historialPrecios/historialPrecios.service';
import { HistorialPrecio } from '../../../models/historial.model';

@Component({
  selector: 'app-editar-productos',
  templateUrl: './editar-productos.component.html',
  styleUrls: ['./editar-productos.component.css']
})
export class EditarProductosComponent {
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

  constructor(
    private productoService: ProductoService,
    private catalogosService: CatalogosService,
    private verProductos: VerProductosComponent,
    private historialService: HistorialPrecioService
  ) {
    this.loadCatalogos();
  }

  updateProducto(): void {
    this.currentProductoHistorial.codigoBarras = this.currentProducto.codigoBarras;
    this.currentProductoHistorial.producto = this.currentProducto.nombreProducto;
    this.currentProductoHistorial.historialPrecios = [{ precio: this.currentProducto.precioPieza, fechaCambio: new Date() }];
    this.productoService.updateProducto(this.currentProducto).subscribe(
      () => {
        this.verProductos.loadProductos();
        this.historialService.updateHistorial(this.currentProductoHistorial).subscribe();
        this.verProductos.isEditDialogOpen = false;
      },
      (error) => {
        console.error('Error actualizando producto:', error);
      }
    );
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
      cantidadAlmacen: 0
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
