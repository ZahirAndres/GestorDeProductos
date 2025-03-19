import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../models/producto.model';
import { Categoria } from '../../../models/categoria.model';
import { ProductoService } from '../../../services/crear-productos.service';
import { ClienteService } from '../../../services/cliente/cliente.service';
import { CatalogosService } from '../../../services/formularios/catalogos.service';

@Component({
  selector: 'app-ver-productos-cliente',
  templateUrl: './ver-productos-cliente.component.html',
  styleUrl: './ver-productos-cliente.component.css'
})
export class VerProductosClienteComponent implements OnInit {
  productos: Producto[] = [];
  categorias: Categoria[] = [];
  filtro: string = '';
  nombreProducto: string = '';
  codigoBarras: string = '';
  isProducto: boolean = false;
  currentProducto: Producto = this.initProducto();
  rol: string | null = null;
  categoriasError: boolean = false;
  productosLoaded: boolean = false;

  constructor(
    private catalogoService: CatalogosService,
    private clienteService: ClienteService,
    private productoService: ProductoService
  ) { }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Carga los productos y las categorías al inicio de la vista.
   */
  ngOnInit(): void {
    this.cargarProductos();
    this.cargarCategorias();
  }

  /**
   * Método privado que inicializa un objeto de tipo Producto con valores por defecto.
   * @returns Un objeto Producto con valores inicializados.
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
   * Método que carga los productos desde el servicio.
   * Dependiendo del rol del usuario, se cargan productos por defecto o productos completos.
   */
  cargarProductos(): void {
    const rol = this.obtenerRol();
    if (rol != null) {
      this.productoService.getProductos().subscribe(
        (response: Producto[]) => {
          this.productos = this.asignarMensajesExistencia(response);
          this.productosLoaded = true;
        },
        (error) => {
          console.error('Error al cargar productos:', error);
          this.productosLoaded = true;
        }
      );
    } else {
      this.clienteService.getProductosDefecto().subscribe(
        (response: Producto[]) => {
          this.productos = this.asignarMensajesExistencia(response);
          this.productosLoaded = true;
        },
        (error) => {
          console.error('Error al cargar productos:', error);
          this.productosLoaded = true;
        }
      );
    }
  }

  /**
   * Método que carga las categorías desde el servicio.
   * En caso de error, marca el estado de error en las categorías.
   */
  cargarCategorias(): void {
    this.catalogoService.getCategorias().subscribe(
      (response: Categoria[]) => {
        this.categorias = response;
      },
      (error) => {
        console.error('Error al cargar categorías:', error);
        this.categoriasError = true;
      }
    );
  }

  /**
   * Método privado que asigna mensajes de existencia y colores según el stock de los productos.
   * Calcula el porcentaje de faltante de los productos tanto en exhibición como en almacén.
   * @param productos Lista de productos a los cuales se les asignarán los mensajes y colores.
   * @returns Un nuevo arreglo de productos con los mensajes de existencia asignados.
   */
  private asignarMensajesExistencia(productos: Producto[]): Producto[] {
    return productos.map((producto) => {
      const faltante = ((producto.stockExhibe - producto.existenciaExhibida) / producto.stockExhibe) * 100;
      let mensajeExistencia = '';
      let colorMensaje = '';

      if (faltante < 0) {
        mensajeExistencia = '';
        colorMensaje = '';
      } else if (faltante < 30) {
        mensajeExistencia = '¡Atención! El producto está a punto de agotarse en la estantería.';
        colorMensaje = 'text-verde';
      } else if (faltante < 60) {
        mensajeExistencia = 'El producto está casi agotado en la estantería, ¡últimas unidades!';
        colorMensaje = 'text-orange';
      } else if (faltante < 100) {
        mensajeExistencia = '¡Casi agotado! La existencia en estantería está al límite.';
        colorMensaje = 'text-danger';
      } else if (faltante == 100) {
        mensajeExistencia = 'Producto agotado en la estantería, ¡sin unidades disponibles!';
        colorMensaje = 'text-danger';
      }

      const faltanteAlmacen = ((producto.stockAlmacen - producto.cantidadAlmacen) / producto.stockAlmacen) * 100;
      let mensajeExistenciaAlmacen = '';
      let colorMensajeAlmacen = '';

      if (faltanteAlmacen < 0) {
        mensajeExistenciaAlmacen = '';
        colorMensajeAlmacen = '';
      } else if (faltanteAlmacen < 30) {
        mensajeExistenciaAlmacen = '¡Alerta! La venta por caja esta a punto de agotarse en el almacén.';
        colorMensajeAlmacen = 'text-verde';
      } else if (faltanteAlmacen < 60) {
        mensajeExistenciaAlmacen = 'La venta por caja esta  casi agotada, ¡aprovecha mientras hay disponibilidad!';
        colorMensajeAlmacen = 'text-orange';
      } else if (faltanteAlmacen < 100) {
        mensajeExistenciaAlmacen = '¡Poca venta por caja disponible! No pierdas la oportunidad.';
        colorMensajeAlmacen = 'text-danger';
      } else if (faltanteAlmacen == 100) {
        mensajeExistenciaAlmacen = 'La venta por caja no esta disponibles en el almacén, ¡agotado!';
        colorMensajeAlmacen = 'text-danger';
      }

      return { ...producto, mensajeExistencia, colorMensaje, mensajeExistenciaAlmacen, colorMensajeAlmacen };
    });
  }

  /**
   * Método que filtra los productos por categoría.
   * Si no se selecciona categoría, recarga todos los productos.
   * @param categoria Categoría para filtrar los productos.
   */
  filtroProductoCategoria(categoria: string): void {
    if (categoria === '') {
      this.cargarProductos();
    } else {
      this.clienteService.getProductosPorCategoria(categoria).subscribe(
        (response: Producto[]) => {
          this.productos = this.asignarMensajesExistencia(response);
          this.productosLoaded = true;
        },
        (error) => {
          console.error('Error al cargar productos por categoría:', error);
          this.productosLoaded = true;
        }
      );
    }
  }

  /**
   * Método que filtra los productos por nombre.
   * Si no se ingresa nombre, recarga todos los productos.
   * @param nombre Nombre del producto para filtrar.
   */
  filtroProductoNombre(nombre: string): void {
    if (nombre === '') {
      this.cargarProductos();
    } else {
      this.clienteService.getProductosPorNombre(nombre).subscribe(
        (response: Producto[]) => {
          this.productos = this.asignarMensajesExistencia(response);
          this.productosLoaded = true;
        },
        (error) => {
          console.error('Error al cargar productos por nombre:', error);
          this.productosLoaded = true;
        }
      );
    }
  }

  /**
   * Método que filtra los productos por categoría y nombre.
   * Si no se ingresa ninguno de los dos parámetros, recarga todos los productos.
   * @param categoria Categoría para filtrar los productos.
   * @param nombre Nombre del producto para filtrar.
   */
  filtroProductoNombreYCategoria(categoria: string, nombre: string): void {
    if (categoria === '' && nombre === '') {
      this.cargarProductos();
    } else {
      this.clienteService.getProductosPorCategoriaYNombre(categoria, nombre).subscribe(
        (response: Producto[]) => {
          this.productos = this.asignarMensajesExistencia(response);
          this.productosLoaded = true;
        },
        (error) => {
          console.error('Error al cargar productos por categoría y nombre:', error);
          this.productosLoaded = true;
        }
      );
    }
  }

  /**
   * Método que abre un diálogo para ver más detalles del producto seleccionado.
   * @param producto Producto que se va a mostrar en el diálogo.
   */
  openProductoDialog(producto: Producto): void {
    this.currentProducto = { ...producto };
    this.isProducto = true;
  }

  /**
   * Método que obtiene el rol del usuario desde el almacenamiento local.
   * @returns El rol del usuario almacenado en el localStorage.
   */
  obtenerRol() {
    return localStorage.getItem('rol');
  }
}
