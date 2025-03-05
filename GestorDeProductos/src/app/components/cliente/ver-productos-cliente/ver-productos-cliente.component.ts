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

  constructor(
    private catalogoService: CatalogosService,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarCategorias();
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
        mensajeExistencia = 'El producto está a punto de agotarse';
        colorMensaje = 'text-verde';
      } else if (faltante < 60) {
        mensajeExistencia = 'El producto está casi agotado';
        colorMensaje = 'text-orange';
      } else if (faltante < 100) {
        mensajeExistencia = 'Existencia al limite de agotarse';
        colorMensaje = 'text-danger';
      } else if (faltante == 100) {
        mensajeExistencia = 'El producto está agotado';
        colorMensaje = 'text-danger';
      }

      return { ...producto, mensajeExistencia, colorMensaje };
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
}
