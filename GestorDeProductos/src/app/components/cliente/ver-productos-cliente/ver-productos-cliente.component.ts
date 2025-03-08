import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../models/producto.model';
import { Categoria } from '../../../models/categoria.model';
import { ProductoService } from '../../../services/crear-productos.service';
import { CategoriasService } from '../../../services/categorias.service';
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

  constructor(
    private catalogoService: CatalogosService,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarCategorias();
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
        cantidadAlmacen: 0,
        mensajeExistencia:'',
        colorMensaje:'',
        mensajeExistenciaAlmacen:'',
        colorMensajeAlmacen:''
      };
    }
  cargarProductos(): void {
    this.clienteService.getProductosDefecto().subscribe(
      (response: Producto[]) => {
        this.productos = this.asignarMensajesExistencia(response);
      },
      (error) => {
        console.error('Error al cargar productos:', error);
      }
    );
  }

  cargarCategorias(): void {
    this.catalogoService.getCategorias().subscribe(
      (response: Categoria[]) => {
        this.categorias = response;
      },
      (error) => {
        console.error('Error al cargar categorías:', error);
      }
    );
  }

  // Función común para calcular y asignar los mensajes de existencia y colores
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
        mensajeExistenciaAlmacen = '¡Alerta! Las cajas están a punto de agotarse en el almacén.';
        colorMensajeAlmacen = 'text-verde';
      } else if (faltanteAlmacen < 60) {
        mensajeExistenciaAlmacen = 'Las cajas están casi agotadas, ¡aprovecha mientras hay disponibilidad!';
        colorMensajeAlmacen = 'text-orange';
      } else if (faltanteAlmacen < 100) {
        mensajeExistenciaAlmacen = '¡Pocas cajas disponibles! No pierdas la oportunidad.';
        colorMensajeAlmacen = 'text-danger';
      } else if (faltanteAlmacen == 100) { 
        mensajeExistenciaAlmacen = 'Cajas no disponibles en el almacén, ¡agotado!';
        colorMensajeAlmacen = 'text-danger';
      }
      


      return { ...producto, mensajeExistencia, colorMensaje, mensajeExistenciaAlmacen, colorMensajeAlmacen };
    });
  }

  filtroProductoCategoria(categoria: string): void {
    if (categoria === '') {
      this.cargarProductos();
    } else {
      this.clienteService.getProductosPorCategoria(categoria).subscribe(
        (response: Producto[]) => {
          this.productos = this.asignarMensajesExistencia(response);
        },
        (error) => {
          console.error('Error al cargar productos por categoría:', error);
        }
      );
    }
  }

  filtroProductoNombre(nombre: string): void {
    if (nombre === '') {
      this.cargarProductos();
    } else {
      this.clienteService.getProductosPorNombre(nombre).subscribe(
        (response: Producto[]) => {
          this.productos = this.asignarMensajesExistencia(response);
        },
        (error) => {
          console.error('Error al cargar productos por nombre:', error);
        }
      );
    }
  }

  filtroProductoNombreYCategoria(categoria: string, nombre: string): void {
    if (categoria === '' && nombre === '') {
      this.cargarProductos();
    } else {
      this.clienteService.getProductosPorCategoriaYNombre(categoria, nombre).subscribe(
        (response: Producto[]) => {
          this.productos = this.asignarMensajesExistencia(response);
        },
        (error) => {
          console.error('Error al cargar productos por categoría y nombre:', error);
        }
      );
    }
  }


  
  openProductoDialog(producto: Producto): void {
    this.currentProducto = { ...producto};
    console.log(this.currentProducto);  // 🔍 Verifica que tenga datos antes de abrir el diálogo
    this.isProducto = true;
  }
  
  
}
