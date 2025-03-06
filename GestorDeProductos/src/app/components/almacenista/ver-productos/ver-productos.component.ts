import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/crear-productos.service';
import { AlmacenistasService } from '../../../services/almacenistas/almacenistas.service';
import { Producto } from '../../../models/producto.model';
import { Categoria } from '../../../models/categoria.model';
import { CatalogosService } from '../../../services/formularios/catalogos.service';

@Component({
  selector: 'app-ver-productos',
  templateUrl: './ver-productos.component.html',
  styleUrls: ['./ver-productos.component.css']
})
export class VerProductosComponent implements OnInit {
  //Para las filtraciones
  productos: any[] = [];
  nombreProducto: string = '';
  categorias: Categoria[] = [];
  filtro: string = '';
  codigoBarras: string = '';

  //para los formularios
  productosFiltrados: Producto[] = [];
  selectedCategory: string = '';
  //Formularios
  isEditDialogOpen: boolean = false;
  isExistenciasDialogOpen: boolean = false;
  isAddDialogOpen: boolean = false;

  currentProducto: Producto = this.initProducto();
  newProducto: Producto = this.initProducto();
  cantidadSeleccionada: number = 0;
  productoExistencias: any = {
    codigoBarras: '',
    nombreProducto: '',
    stockNuevo: 0
  };
  proveedorInput: string = '';

  proveedorInputEdit: string = '';

  mensaje: string = '';
  marcas: string[] = [];
  proveedores: string[] = [];
  tamanios: string[] = [];

  constructor(
    private almacenistaService: AlmacenistasService,
    private productoService: ProductoService,
    private catalogosService: CatalogosService
  ) { }

  ngOnInit(): void {
    this.loadProductos();
    this.loadCatalogos();
    this.cargarCategorias()
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

  cargarCategorias(): void {
    this.catalogosService.getCategorias().subscribe(
      (response: Categoria[]) => {
        this.categorias = response;
      },
      error => {
        console.error("Error al cargar categorías:", error);
      }
    );
  }

  loadProductos(): void {
    this.productoService.getProductos().subscribe(
      (data) => {
        this.productos = data;
        this.productos = [...this.productos]; 
        console.log("Productos cargados:", this.productos); 
      },
      (error) => {
        console.error("Error cargando productos:", error);
      }
    );
  }  


  filtrarPorCategoria(categoria: string) {
    if (categoria === "") {
      this.loadProductos();
    } else {
      this.almacenistaService.filtrarPorCategoria(categoria).subscribe(
        (response: Producto[]) => {
          this.productos = response.map(producto => ({
            ...producto,
            mostrarFormulario: false,
            cantidadAgregada: 0,
            faltanteEnEstante: producto.stockExhibe - producto.existenciaExhibida
          }));
        },
        (error) => {
          console.error('Error al cargar productos por categoría:', error);
        }
      );
    }
  }
  

  filtrarPorNombre(nombre: string) {
    if (nombre == "") {
      this.loadProductos();
    } else {
      this.almacenistaService.filtrarPorNombre(nombre).subscribe(
        (response: Producto[]) => {
          this.productos = response.map(producto => ({ ...producto, mostrarFormulario: false, cantidadAgregada: 0,
            faltanteEnEstante: producto.stockExhibe - producto.existenciaExhibida }));        },
        (error) => {
          console.error('Error al cargar productos:', error);
        }
      );
    }
  }

  filtrarPorCodigoBarras(codigo: string) {
    if (codigo == "") {
      this.loadProductos();
    } else {
      this.almacenistaService.filtrarPorCodigoBarras(codigo).subscribe(
        (response: Producto[]) => {
          this.productos = response.map(producto => ({ ...producto, mostrarFormulario: false, cantidadAgregada: 0,
            faltanteEnEstante: producto.stockExhibe - producto.existenciaExhibida }));        },
        (error) => {
          console.error('Error al cargar productos:', error);
        }
      );
    }
  }

  


  filterByCategory(): void {
    this.productosFiltrados = this.selectedCategory ?
      this.productos.filter(producto => producto.categoria === this.selectedCategory) :
      [...this.productos];
  }

  openEditDialog(producto: Producto): void {
    this.currentProducto = { ...producto };
    this.isEditDialogOpen = true;
  }

  closeEditDialog(): void {
    this.isEditDialogOpen = false;
  }

  updateProducto(): void {
    this.productoService.updateProducto(this.currentProducto).subscribe(
      (updatedProduct) => {
        const index = this.productos.findIndex(prod => prod._id === updatedProduct._id);
        if (index !== -1) {
          this.productos[index] = updatedProduct;
          this.loadProductos();
        }
        this.isEditDialogOpen = false; // Cerrar el cuadro de diálogo después de actualizar
      },
      (error) => {
        console.error('Error actualizando producto:', error);
      }
    );
  }
  

  deleteProducto(id: string): void {
    console.log("ID recibido para borrar:", id);
    if (!id) {
      console.error('ID del producto no válido');
      return;
    }


    this.productoService.deleteProducto(id).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        alert('Producto borrado con éxito');
        window.location.reload();
        alert('Producto borrado con éxito');
        window.location.reload();
      },
      (error) => {
        console.error('Error al borrar producto:', error);
      }
    );
  }


  openExistenciasDialog(producto: any) {
    console.log('Producto seleccionado para actualizar existencias:', producto);
    this.productoExistencias = { ...producto, stockNuevo: producto.stockTotal };
    this.isExistenciasDialogOpen = true;
  }

  closeExistenciasDialog(): void {
    this.isExistenciasDialogOpen = false;
  }

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
          this.loadProductos();
        }
        this.closeExistenciasDialog();
      },
      (error) => {
        console.error('Error actualizando stock:', error);
      }
    );
  }
  

  openAddDialog(): void {
    this.newProducto = this.initProducto();
    this.isAddDialogOpen = true;
  }

  closeAddDialog(): void {
    this.isAddDialogOpen = false;
    this.loadProductos();
  }

  loadCatalogos(): void {
    this.catalogosService.getCategorias().subscribe(data => this.categorias = data.map(c => c.nombreCategoria));
    this.catalogosService.getMarcas().subscribe(data => this.marcas = data.map(m => m.nombreMarca));
    this.catalogosService.getProveedores().subscribe(data => this.proveedores = data.map(p => p.nombreProveedor));
    this.catalogosService.getTamanios().subscribe(data => this.tamanios = data.map(t => t.nombreTamanio));
  }

  eliminarProveedorEdit(index: number): void {
    this.currentProducto.proveedor.splice(index, 1);
  }
  

  actualizarProveedoresEdit(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.currentProducto.proveedor = Array.from(selectElement.selectedOptions, option => option.value);
  }

  agregarProveedorEdit(): void {
    if (this.proveedorInputEdit && this.proveedorInputEdit.trim()) {
      if (!this.currentProducto.proveedor.includes(this.proveedorInputEdit)) {
        this.currentProducto.proveedor.push(this.proveedorInputEdit.trim());
      } else {
        alert("El proveedor ya ha sido agregado.");
      }
      this.proveedorInputEdit = ''; // Limpiar selección después de agregar
    }
  }

  
  
  
  

}