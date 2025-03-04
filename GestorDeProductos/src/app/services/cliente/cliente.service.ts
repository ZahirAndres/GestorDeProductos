import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from '../../config/config';
import { Observable } from 'rxjs';
import { Producto } from '../../models/producto.model';  // Asegúrate de tener el modelo Producto

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = CONFIG.apiUrl + '/cliente';

  constructor(private http: HttpClient) { }

  // Obtener productos por categoría
  getProductosPorCategoria(categoria: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/filtrosCliente/categoria/${categoria}`);
  }

  // Obtener productos por nombre
  getProductosPorNombre(nombre: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/filtrosCliente/nombreProducto/${nombre}`);
  }

  // Obtener productos por categoría y nombre
  getProductosPorCategoriaYNombre(categoria: string, nombre: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/filtrosCliente/nombreProductoYCategoria/${categoria}/${nombre}`);
  }

  // Obtener productos por defecto
  getProductosDefecto(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/filtrosCliente/defecto/`);
  }
}
