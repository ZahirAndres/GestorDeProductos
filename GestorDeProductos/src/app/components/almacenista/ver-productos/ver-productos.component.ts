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

  //Formularios
  isEditDialogOpen: boolean = false;
  isExistenciasDialogOpen: boolean = false;
  isAddDialogOpen: boolean = false;

  currentProducto: Producto = this.initProducto();
  newProducto: Producto = this.initProducto();

  constructor(
    private almacenistaService: AlmacenistasService,
    private productoService: ProductoService,
    private catalogoService: CatalogosService
  ) { }

  ngOnInit(): void {
    this.loadProductos();
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

  
  /**
   * - Carga los productos
   */
  loadProductos(): void {
    this.productoService.getProductos().subscribe(
      (data) => {
        this.catalogoService.getCategorias().subscribe(
          (response: Categoria[]) => {
            this.categorias = response;
          },
          (error) => {
            console.error('Error al cargar categorías:', error);
          }
        );
        this.productos = data;
        this.productos = [...this.productos];
        console.log("Productos cargados:", this.productos);
      },
      (error) => {
        console.error("Error cargando productos:", error);
      }
    );
  }

/**
 * -  Filtra los productos por categoría
 * @param categoria - Filtra los productos por categoría
 */ 
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

/**
 * - Filtra los productos por nombre
 * @param nombre - Filtra los productos por nombre
 */
  filtrarPorNombre(nombre: string) {
    if (nombre == "") {
      this.loadProductos();
    } else {
      this.almacenistaService.filtrarPorNombre(nombre).subscribe(
        (response: Producto[]) => {
          this.productos = response.map(producto => ({
            ...producto, mostrarFormulario: false, cantidadAgregada: 0,
            faltanteEnEstante: producto.stockExhibe - producto.existenciaExhibida
          }));
        },
        (error) => {
          console.error('Error al cargar productos:', error);
        }
      );
    }
  }
/**
 * - Filtra los productos por código de barras
 * @param codigo - Filtra los productos por código de barras
 */
  filtrarPorCodigoBarras(codigo: string) {
    if (codigo == "") {
      this.loadProductos();
    } else {
      this.almacenistaService.filtrarPorCodigoBarras(codigo).subscribe(
        (response: Producto[]) => {
          this.productos = response.map(producto => ({
            ...producto, mostrarFormulario: false, cantidadAgregada: 0,
            faltanteEnEstante: producto.stockExhibe - producto.existenciaExhibida
          }));
        },
        (error) => {
          console.error('Error al cargar productos:', error);
        }
      );
    }
  }

  /**
   * - Abre el cuadro de diálogo para editar un producto
   * @param producto - Abre para editar un producto
   */
  openEditDialog(producto: Producto): void {
    this.currentProducto = { ...producto }; 
    this.isEditDialogOpen = true; 
  }


/**
 * - Cierra el cuadro de diálogo para editar un producto
 * @param id - Elimina un producto
 * @returns - Elimina un producto
 */
  deleteProducto(id: string): void {
    if (!id) {
      console.error('ID del producto no válido');
      return;
    }

    if (confirm('¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.')) {
      this.productoService.deleteProducto(id).subscribe(
        () => {
          this.loadProductos();
          this.productos = this.productos.filter(prod => prod._id !== id);
          alert('Producto borrado con éxito ✅');
        },
        (error) => {
          console.error('Error al borrar producto:', error);
        }
      );
    }
  }



/**
 * - Actualiza un producto
 * @param producto - Actualiza un producto
 */
  openExistenciasDialog(producto: Producto) {
    this.currentProducto = { ...producto };  // Copia el producto seleccionado
    this.isExistenciasDialogOpen = true;  // Abre el diálogo
  }

  /**
   * - Actualiza un producto
   * @param producto - Actualiza un producto
   */
  openAddDialog(): void {
    this.newProducto = this.initProducto();
    this.isAddDialogOpen = true;
  }



  /**
   * - Cierra el cuadro de diálogo de agregar
   */ 
  closeAddDialog(): void {
    this.isAddDialogOpen = false;
    this.loadProductos();
  }

  /**
   * Colores de almacén
   * @param producto - prodcuto que se esta mostrando
   * @returns 
   */
  getAlmacenClass(producto: Producto): string {
    if (producto.cantidadAlmacen < producto.stockAlmacen) {
      return 'almacen-rojo';
    
    } else if (producto.cantidadAlmacen === producto.stockAlmacen) {
      return 'almacen-naranja';
    
    } else {
      return 'almacen-verde';
    }
  }
  

}