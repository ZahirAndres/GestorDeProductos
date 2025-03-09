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

  newProducto: Producto = this.initProducto();
  mensaje: string = '';
  proveedorInput: string = '';
  marcas: string[] = [];
  proveedores: string[] = [];
  tamanios: string[] = [];
  categorias: Categoria[] = [];

  constructor(
    private productoService: ProductoService,
    private catalogosService: CatalogosService,
    private verProdcutos : VerProductosComponent
  ) { }

  ngOnInit(): void {
    this.loadCatalogos();
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
    console.log(this.newProducto);

    if (!this.validarProducto()) {
      this.mensaje = 'Por favor, llena los campos obligatorios correctamente.';
      return;
    }

    this.productoService.createProducto(this.newProducto).subscribe(
      (createdProduct) => {
        this.verProdcutos.loadProductos();
        this.mensaje = 'Producto creado exitosamente.';
        this.newProducto = this.initProducto(); // Limpiar formulario después de la creación
        setTimeout(() => this.mensaje = '', 3000); // Limpiar mensaje después de 3 segundos
      },
      (error) => {
        console.error('Error agregando producto:', error);
        this.mensaje = 'Hubo un error al crear el producto.';
      }
    );
  }

  agregarProveedor(): void {
    if (this.proveedorInput && this.proveedorInput.trim()) {
      // Verifica si el proveedor ya existe en el array
      if (!this.newProducto.proveedor.includes(this.proveedorInput.trim())) {
        this.newProducto.proveedor.push(this.proveedorInput.trim());
        this.proveedorInput = ''; // Limpia el campo de entrada después de agregar
      } else {
        alert("El proveedor ya ha sido agregado.");
      }
    } else {
      alert("Por favor, ingresa un proveedor válido.");
    }
  }
  

  eliminarProveedor(index: number): void {
    this.newProducto.proveedor.splice(index, 1);
  }

  loadCatalogos(): void {
    this.catalogosService.getMarcas().subscribe(data => this.marcas = data?.map(m => m.nombreMarca) || []);
    this.catalogosService.getProveedores().subscribe(data => this.proveedores = data?.map(p => p.nombreProveedor) || []);
    this.catalogosService.getTamanios().subscribe(data => this.tamanios = data?.map(t => t.nombreTamanio) || []);
    this.catalogosService.getCategorias().subscribe(data => { console.log("Categorías recibidas:", data); this.categorias = data?.map(c => c.nombreCategoria) || [];});
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
}
