import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/crear-productos.service';
import { Router } from '@angular/router';
import { Producto } from '../../../models/producto.model';
import { NgForm } from '@angular/forms';
import { CategoriasService } from '../../../services/categorias.service';
import { Categoria } from '../../../models/categoria.model';
import { FiltrosService } from '../../../services/ayudantePasillo/filtros.service';

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

  constructor(private productoService: ProductoService,
    private router: Router,
    private categoriaService: CategoriasService,
    private filtrosAyudanteService: FiltrosService) { }

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarCategorias();
  }

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

  cargarCategorias(): void {
    this.categoriaService.getCategorias().subscribe(
      (response: Categoria[]) => {
        this.categorias = response;
      },
      error => {
        console.error("Error al cargar categorías:", error);
      }
    );
  }


  actualizarCantidad(form: NgForm, producto: Producto): void {
    if (form.valid) {
      if (producto.cantidadAgregada) {
        producto.existenciaExhibida += producto.cantidadAgregada;
        this.productoService.updateProducto(producto).subscribe(
          (response) => {
            console.log('Producto actualizado:', response);
            producto.cantidadAgregada = 0;
            form.resetForm();
            producto.mostrarFormulario = false;
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

  toggleFormulario(producto: Producto): void {
    this.productos.forEach(p => {
      if (p.mostrarFormulario !== producto.mostrarFormulario) {
        p.mostrarFormulario = false;
      }
    });
    producto.mostrarFormulario = !producto.mostrarFormulario;
  }

  //Filtros
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
