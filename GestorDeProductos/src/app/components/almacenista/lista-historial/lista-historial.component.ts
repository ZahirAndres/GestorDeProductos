import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { AlmacenistasService } from '../../../services/almacenistas/almacenistas.service';
import { ProductoService } from '../../../services/crear-productos.service';
import { CatalogosService } from '../../../services/formularios/catalogos.service';
import { Categoria } from '../../../models/categoria.model';
import { Producto } from '../../../models/producto.model';

@Component({
  selector: 'app-lista-historial',
  templateUrl: './lista-historial.component.html',
  styleUrls: ['./lista-historial.component.css'] 
})
export class ListaHistorialComponent implements OnInit {
  nombreProducto: string = '';
  categorias: Categoria[] = [];
  filtro: string = '';
  codigoBarras: string = '';
  productos: Producto[] = [];


  @Output() productoSeleccionado = new EventEmitter<Producto>()

  constructor(
    private almacenistaService: AlmacenistasService,
    private productoService: ProductoService,
    private catalogosService: CatalogosService,
  ) {}

  ngOnInit(): void {
    this.loadProductos();
    this.cargarCategorias();
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
        this.productos = data.slice(0, 3); // Solo tomamos los primeros 3 productos
        console.log("Productos cargados (máximo 3):", this.productos);
      },
      (error) => {
        console.error("Error cargando productos:", error);
      }
    );
  }  

  filtrarPorNombre(nombre: string): void {
    if (!nombre.trim()) {  
      return this.loadProductos();
    }

    this.almacenistaService.filtrarPorNombre(nombre).subscribe(
      (response: Producto[]) => {
        this.productos = response.map(producto => ({
          ...producto,
          mostrarFormulario: false,
          cantidadAgregada: 0,
          faltanteEnEstante: producto.stockExhibe - producto.existenciaExhibida
        }));
      },
      (error) => {
        console.error('Error al cargar productos:', error);
      }
    );
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


  seleccionarProducto(producto: Producto): void {
    this.productoSeleccionado.emit(producto);  
  }
}
