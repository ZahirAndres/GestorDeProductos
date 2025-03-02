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
  filtrarLotes(filtros : {codigoLote?: string; fechaCaducidad?: string; producto? :string}): Observable<any[]>{
    let params =  new HttpParams();

    if(filtros.codigoLote) params = params.set('codigoLote', filtros.codigoLote);
    if(filtros.fechaCaducidad) params = params.set('fechaCaducidad', filtros.fechaCaducidad);
    if(filtros.producto) params = params.set('producto', filtros.producto);

    return this.http.get<any[]>(`${this.apiUri}/lotes/filtrar`, {params});
  }

}
