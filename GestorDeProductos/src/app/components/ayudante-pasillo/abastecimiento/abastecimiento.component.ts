import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/crear-productos.service';
import { Router } from '@angular/router';
import { Producto } from '../../../models/producto.model';
import { NgForm } from '@angular/forms';
import { Categoria } from '../../../models/categoria.model';
import { FiltrosService } from '../../../services/ayudantePasillo/filtros.service';
import { CatalogosService } from '../../../services/formularios/catalogos.service';

@Component({
  selector: 'app-abastecimiento',
  templateUrl: './abastecimiento.component.html',
  styleUrls: ['./abastecimiento.component.css']
})
export class AbastecimientoComponent implements OnInit {
  productos: Producto[] = []; // Lista de productos
  categorias: Categoria[] = []; // Lista de categorias
  filtro: string = '';
  nombreProducto : string = '';
  codigoBarras: string = '';

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private catalogoService: CatalogosService,
    private filtrosAyudanteService: FiltrosService) { }

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarCategorias();
  }

  //Funcion que carga todos los productos que puede ver el ayudante.
  cargarProductos(): void {
    this.filtrosAyudanteService.getProductosPasilloDefecto().subscribe(
      (response: Producto[]) => {
        this.productos = response.map(producto => ({ ...producto, mostrarFormulario: false, cantidadAgregada: 0,
          faltanteEnEstante: producto.stockExhibe - producto.existenciaExhibida }));
      },
      (error) => {
        console.error('Error al cargar productos:', error);
      }
    );
  }

  //Carga todas las categorias exitentes en la BD para poder filtrar los productos
  cargarCategorias(): void {
    this.catalogoService.getCategorias().subscribe(
      (response: Categoria[]) => {
        this.categorias = response;
      },
      error => {
        console.error("Error al cargar categorías:", error);
      }
    );
  }

  // Este metodo con ayuda del "Codigo de Barras" puede actualizar (sumar) la cantidad de productos
  // existente en el estante de un producto determinado.
  actualizarCantidad(form: NgForm, producto: Producto): void {
    if (form.valid) {
      if (producto.cantidadAgregada) {
        var codigoBarras = producto.codigoBarras;
        this.filtrosAyudanteService.actualizarCantidadExistente( producto.cantidadAgregada, codigoBarras).subscribe(
          (response) => {
            console.log('Producto actualizado:', response);
            producto.cantidadAgregada = 0;
            form.resetForm();
            producto.mostrarFormulario = false;
            this.cargarProductos();
          },
          (error) => {
            console.error('Error al actualizar producto:', error);
          }
        );
      } else {
        console.warn("El formulario no es válido");
      }
    }
  }

  //Toggle para mostrar o ocultar el formulario de edición del producto.
  toggleFormulario(producto: Producto): void {
    this.productos.forEach(p => {
      if (p.mostrarFormulario !== producto.mostrarFormulario) {
        p.mostrarFormulario = false;
      }
    });
    producto.mostrarFormulario = !producto.mostrarFormulario;
  }

  //Filtros

  //Filtro que cambia el objeto "productos" por el resultado del filtro.
  // Los filtra por categoria
  filtroProductoCategoria(categoria: string) {
    if (categoria == "") {
      this.cargarProductos();
    } else {
      this.filtrosAyudanteService.getProductosPorCategoria(categoria).subscribe(
        (response: Producto[]) => {
          this.productos = response.map(producto => ({ ...producto, mostrarFormulario: false, cantidadAgregada: 0,
            faltanteEnEstante: producto.stockExhibe - producto.existenciaExhibida }));        },
        (error) => {
          console.error('Error al cargar productos:', error);
        }
      );
    }
  }

    //Filtro que cambia el objeto "productos" por el resultado del filtro.
  // Los filtra por Nombre del producto
  filtroProductoNombre(nombre: string) {
    if (nombre == "") {
      this.cargarProductos();
    } else {
      this.filtrosAyudanteService.getProductosPorNombre(nombre).subscribe(
        (response: Producto[]) => {
          this.productos = response.map(producto => ({ ...producto, mostrarFormulario: false, cantidadAgregada: 0,
            faltanteEnEstante: producto.stockExhibe - producto.existenciaExhibida }));        },
        (error) => {
          console.error('Error al cargar productos:', error);
        }
      );
    }
  }

    //Filtro que cambia el objeto "productos" por el resultado del filtro.
  // Los filtra por su codigo de barras.
  filtroProductoCodigo(codigo: string) {
    if (codigo == "") {
      this.cargarProductos();
    } else {
      this.filtrosAyudanteService.getProductosPorCodigo(codigo).subscribe(
        (response: Producto[]) => {
          this.productos = response.map(producto => ({ ...producto, mostrarFormulario: false, cantidadAgregada: 0,
            faltanteEnEstante: producto.stockExhibe - producto.existenciaExhibida }));        },
        (error) => {
          console.error('Error al cargar productos:', error);
        }
      );
    }
  }
}
