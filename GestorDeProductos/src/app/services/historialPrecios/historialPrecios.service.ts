import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CONFIG } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class HistorialPrecioService {
  private apiUri = CONFIG.apiUrl + '/historial-precios'; 

  constructor(private http: HttpClient) { }

  // Obtener todos los historiales de precios de un producto por código de barras
  getHistorialPorCodigoBarras(codigoBarras: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUri}/${codigoBarras}`);
  }

  // Obtener el último historial de precios de un producto por código de barras
  getUltimoHistorialPorCodigoBarras(codigoBarras: string): Observable<any> {
    return this.http.get<any>(`${this.apiUri}/ultimo/${codigoBarras}`);
  }

  // Crear un nuevo historial de precio
  createHistorial(historialPrecio: any): Observable<any> {
    return this.http.post<any>(`${this.apiUri}`, historialPrecio);
  }

  // Eliminar historial de precios por código de barras
  deleteHistorialPorCodigoBarras(codigoBarras: string): Observable<any> {
    return this.http.delete(`${this.apiUri}/${codigoBarras}`, { responseType: 'text' });
  }

  // Actualizar o agregar un nuevo historial de precios
  updateHistorial(historialPrecio: any): Observable<any> {
    return this.http.put<any>(`${this.apiUri}`, historialPrecio);
  }
}
