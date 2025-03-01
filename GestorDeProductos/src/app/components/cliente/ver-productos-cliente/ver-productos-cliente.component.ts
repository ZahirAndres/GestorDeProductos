import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../models/producto.model';
import { Categoria } from '../../../models/categoria.model';
import { ProductoService } from '../../../services/crear-productos.service';
import { CategoriasService } from '../../../services/categorias.service';
import { FiltrosService } from '../../../services/ayudantePasillo/filtros.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-productos-cliente',
  templateUrl: './ver-productos-cliente.component.html',
  styleUrl: './ver-productos-cliente.component.css'
})
export class VerProductosClienteComponent implements OnInit {
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
  }

  cargarProductos(): void {
    this.productoService.getProductos().subscribe(
      (response: Producto[]) => {
        this.productos = response.map(producto => {
          // Calcular porcentaje de productos faltantes
          const faltante = ((producto.stockExhibe - producto.existenciaExhibida) / producto.stockExhibe) * 100;
  
          // Determinar mensaje y color según el faltante
          let mensajeExistencia = "";
          let colorMensaje = "";
  
          if (faltante < 0) {
            mensajeExistencia = "";
            colorMensaje = ""; // Sin color si no aplica
          } else if (faltante < 30) {
            mensajeExistencia = "El producto está a punto de agotarse";
            colorMensaje = "text-verde"; // Amarillo
          } else if (faltante < 60) {
            mensajeExistencia = "El producto está casi agotado";
            colorMensaje = "text-orange"; // Naranja
          } else if (faltante < 100) {
            mensajeExistencia = "El producto está agotado";
            colorMensaje = "text-danger"; // Rojo
          }
  
          return {
            ...producto,
            mensajeExistencia: mensajeExistencia,
            colorMensaje: colorMensaje
          };
        });
      },
      (error) => {
        console.error('Error al cargar productos:', error);
      }
    );
  }
  

}
