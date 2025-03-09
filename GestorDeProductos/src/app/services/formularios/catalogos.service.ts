import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from '../../config/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {
private apiUri = CONFIG.apiUrl + '/formularios';

  constructor(private http: HttpClient) { }


 /**
   * 
   * @returns 
   */
 getCategorias() {
  return this.http.get<any[]>(`${this.apiUri}/categorias/ver`);
}

getMarcas() {
  return this.http.get<any[]>(`${this.apiUri}/marcas/ver`);
}

getProveedores() {
  return this.http.get<any[]>(`${this.apiUri}/proveedores/ver`);
}

getTamanios() {
  return this.http.get<any[]>(`${this.apiUri}/tamanios/ver`);
}

  /**
 * Obtener proveedores por nombres de productos
 * @param nombresProveedores Lista de nombres de proveedores
 * @returns Lista de proveedores encontrados
 */
  obtenerProveedoresPorProducto(nombresProveedores: string[]): Observable<any[]> {
    let params = new HttpParams();
  
    nombresProveedores.forEach(nombre => {
      params = params.append('nombresProveedores', nombre);
    });
  
    return this.http.get<any[]>(`${this.apiUri}/proveedores/ver/byProducto`, { params });
  }

}
 