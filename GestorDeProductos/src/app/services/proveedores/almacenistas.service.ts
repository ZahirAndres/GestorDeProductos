import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONFIG } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class AlmacenistasService {
  private apiUri = CONFIG.apiUrl + '/almacenista';

  constructor(private http: HttpClient) { }

  getAlmacenistas() {
    return this.http.get<any[]>(`${this.apiUri}/ver`);
  }

  createAlmacenistas(producto: any): Observable<any> {
    return this.http.post<any[]>(`${this.apiUri}/crear`, producto);
  }

  deteleteAlmacenistas(id: string): Observable<any> {
    return this.http.delete(`${this.apiUri}/borrar/${id}`, { responseType: 'text' });
  }


   /** ==============================
   * GESTIÓN DE LOTES
   * ============================== */

  /**
   * 
   * @returns todos los lotes que existen en la base de datos
   */
  getLotes() {
    return this.http.get<any[]>(`${this.apiUri}/lotes/ver`);
  }

  /**
   * 
   * @param filtros filtros para filtrar los lotes
   * @returns los lotes que cumplen con los filtros
   */
  filtrarLotes(filtros : {categoria?: string; fecha?: string; nombre? :string}): Observable<any[]>{
    let params =  new HttpParams();

    if(filtros.categoria) params = params.set('categoria', filtros.categoria);
    if(filtros.fecha) params = params.set('fecha', filtros.fecha);
    if(filtros.nombre) params = params.set('nombre', filtros.nombre);

    return this.http.get<any[]>(`${this.apiUri}/lotes/filtrar`, {params});
  }

}
