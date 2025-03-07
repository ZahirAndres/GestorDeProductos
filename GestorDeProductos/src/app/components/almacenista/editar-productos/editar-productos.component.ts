import { Component, Input } from '@angular/core';
import { ProductoService } from '../../../services/crear-productos.service';
import { Producto } from '../../../models/producto.model';
import { CatalogosService } from '../../../services/formularios/catalogos.service';
import { VerProductosComponent } from '../ver-productos/ver-productos.component';

@Component({
  selector: 'app-editar-productos',
  templateUrl: './editar-productos.component.html',
  styleUrls: ['./editar-productos.component.css']
})
export class EditarProductosComponent {
  @Input() currentProducto: Producto = this.initProducto(); // Ahora se recibe el producto desde el componente padre
  productos: Producto[] = []; 
  isEditDialogOpen: boolean = false;
  proveedorInputEdit: string = '';
  marcas: string[] = [];
  proveedores: string[] = [];
  tamanios: string[] = [];
  categorias: string[] = [];

  constructor(
    private productoService: ProductoService,
    private catalogosService: CatalogosService,
        private verProdcutos : VerProductosComponent
    
  ) {
    this.loadCatalogos();
  }

  updateProducto(): void {
    this.productoService.updateProducto(this.currentProducto).subscribe(
      (updatedProduct) => {
        const index = this.productos.findIndex(prod => prod._id === updatedProduct._id);
        if (index !== -1) {
          this.productos[index] = updatedProduct;
        }
        this.verProdcutos.loadProductos();
        this.verProdcutos.isEditDialogOpen = false;
      },
      (error) => {
        console.error('Error actualizando producto:', error);
      }
    );
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

  agregarProveedorEdit(): void {
    if (this.proveedorInputEdit.trim() && !this.currentProducto.proveedor.includes(this.proveedorInputEdit)) {
      this.currentProducto.proveedor.push(this.proveedorInputEdit.trim());
      this.proveedorInputEdit = ''; 
    } else {
      alert("El proveedor ya ha sido agregado o está vacío.");
    }
  }

  eliminarProveedorEdit(index: number): void {
    this.currentProducto.proveedor.splice(index, 1);
  }

  closeEditDialog(): void {
    this.verProdcutos.isEditDialogOpen = false; 
}

  loadCatalogos(): void {
    this.catalogosService.getCategorias().subscribe(data => this.categorias = data.map(c => c.nombreCategoria));
    this.catalogosService.getMarcas().subscribe(data => this.marcas = data.map(m => m.nombreMarca));
    this.catalogosService.getProveedores().subscribe(data => this.proveedores = data.map(p => p.nombreProveedor));
    this.catalogosService.getTamanios().subscribe(data => this.tamanios = data.map(t => t.nombreTamanio));
  }
}
