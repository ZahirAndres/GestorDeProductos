import { Component } from '@angular/core';
import { Producto } from '../../../models/producto.model';
import { HistorialPrecioService } from '../../../services/historialPrecios/historialPrecios.service';


@Component({
  selector: 'app-historial-precios',
  templateUrl: './historial-precios.component.html',
  styleUrl: './historial-precios.component.css'
})
export class HistorialPreciosComponent {

  historialPrecios: any[] = [];

  productoSeleccionado: Producto | null = null;

  constructor(
    private historialPrecioService: HistorialPrecioService
  ){}

  cargarHistorialPrecios(codigoBarras: string): void {
    this.historialPrecioService.getHistorialPorCodigoBarras(codigoBarras).subscribe(
      (response) => {
        console.log("Datos recibidos en historialPrecios:", response); // 👈 Agrega esto
        this.historialPrecios = response;
      },
      (error) => {
        console.error("Error al cargar historial de precios:", error);
      }
    );
  }   

  recibirProductoSeleccionado(producto: Producto): void {
    this.productoSeleccionado = producto;
    this.cargarHistorialPrecios(producto.codigoBarras);
  }

}
