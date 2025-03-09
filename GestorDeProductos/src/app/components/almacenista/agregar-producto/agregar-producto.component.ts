import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ProductoService } from '../../../services/crear-productos.service';
import { Producto } from '../../../models/producto.model';
import { Categoria } from '../../../models/categoria.model';
import { CatalogosService } from '../../../services/formularios/catalogos.service';
import { VerProductosComponent } from '../ver-productos/ver-productos.component';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  imagenUrlInput: string = '';
  currentImageIndex: number = 0;
  newProducto: Producto = this.initProducto();
  mensaje: string = '';
  proveedorInput: string = '';
  marcas: string[] = [];
  proveedores: string[] = [];
  tamanios: string[] = [];
  categorias: Categoria[] = [];
  
  // Variable para marcar error en el input de código de barras
  codigoBarrasError: boolean = false;

  constructor(
    private productoService: ProductoService,
    private catalogosService: CatalogosService,
    private verProdcutos: VerProductosComponent
  ) { }

  ngOnInit(): void {
    this.loadCatalogos();
    if (!this.newProducto.imagenUrl) {
      this.newProducto.imagenUrl = []; 
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

  addProducto(): void {
    this.mensaje = ''; // Limpiar mensaje previo

    if (!this.validarProducto()) {
      this.mensaje = 'Por favor, llena los campos obligatorios correctamente.';
      return;
    }

    this.productoService.createProducto(this.newProducto).subscribe(
      (createdProduct) => {
        this.verProdcutos.loadProductos();
        this.mensaje = 'Producto creado exitosamente.';
        this.newProducto = this.initProducto(); // Limpiar formulario
        // Opcional: limpiar mensaje después de unos segundos
        setTimeout(() => this.mensaje = '', 3000);
      },
      (error) => {
        console.error('Error agregando producto:', error);
        if (error.status === 409) { // Conflicto: producto ya existe
          window.alert('El producto con ese código de barras ya existe.');
          this.codigoBarrasError = true;
        } else {
          window.alert('Hubo un error al crear el producto.');
        }
      }
    );
  }

  agregarProveedor(): void {
    if (!this.proveedorInput.trim()) {
      alert("Por favor, ingresa un proveedor válido.");
      return;
    }
    if (this.newProducto.proveedor.includes(this.proveedorInput.trim())) {
      alert("El proveedor ya ha sido agregado.");
      return;
    }
    this.newProducto.proveedor.push(this.proveedorInput.trim());
    this.proveedorInput = ''; 
  }

  eliminarProveedor(index: number): void {
    this.newProducto.proveedor.splice(index, 1);
  }

  loadCatalogos(): void {
    this.catalogosService.getMarcas().subscribe(data => this.marcas = data?.map(m => m.nombreMarca) || []);
    this.catalogosService.getProveedores().subscribe(data => this.proveedores = data?.map(p => p.nombreProveedor) || []);
    this.catalogosService.getTamanios().subscribe(data => this.tamanios = data?.map(t => t.nombreTamanio) || []);
    this.catalogosService.getCategorias().subscribe(data => {
      console.log("Categorías recibidas:", data);
      this.categorias = data?.map(c => c.nombreCategoria) || [];
    });
  }

  validarProducto(): boolean {
    return this.newProducto.nombreProducto.trim() !== '' &&
      this.newProducto.categoria.trim() !== '' &&
      this.newProducto.marca.trim() !== '' &&
      this.newProducto.tamano.trim() !== '' &&
      this.newProducto.precioPieza > 0 &&
      this.newProducto.precioCaja >= 0 &&
      this.newProducto.cantidadPiezasPorCaja >= 0;
  }

  cerrarFormulario() {
    this.close.emit();
  }

  agregarImagen(): void {
    if (!this.imagenUrlInput.trim()) {
      alert("Por favor, ingresa una URL de imagen válida.");
      return;
    }
    if (this.newProducto.imagenUrl?.includes(this.imagenUrlInput.trim())) {
      alert("La imagen ya existe en la lista.");
      return;
    }
    this.newProducto.imagenUrl?.push(this.imagenUrlInput.trim());
    this.imagenUrlInput = ''; 
  }

  eliminarImagen(index: number) {
    this.newProducto.imagenUrl?.splice(index, 1);
    if (this.currentImageIndex >= (this.newProducto.imagenUrl?.length || 0)) {
      this.currentImageIndex = Math.max(0, (this.newProducto.imagenUrl?.length || 0) - 1);
    }
  }
}

