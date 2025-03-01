import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONFIG } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class AlmacenistasService {
  private apiUri = CONFIG.apiUrl + '/almacenistas';

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
   * Metodo para crear un lote
   * @param producto - lote a crear
   * @returns - lote creado
   */
  createLote(producto: any): Observable<any> {
    return this.http.post<any[]>(`${this.apiUri}/lotes/crear`, producto);
  }
  
  /**
   *  Metodo para eliminar un lote
   * @param id  - id del lote a eliminar
   * @returns  - mensaje de confirmación
   */
  deteleteLotes(id: string): Observable<any> {
    return this.http.delete(`${this.apiUri}/lotes/borrar/${id}`, { responseType: 'text' });
  }


  /**
 * Filtrar lotes solo por código de lote
 * @param codigoLote Código del lote a buscar
 * @returns Lista de lotes que coincidan con el código de lote
 */
  filtrarLotesPorCodigoLote(codigoLote: string): Observable<any[]> {
    let params = new HttpParams();
    if (codigoLote) {
      params = params.set('codigoLote', codigoLote);
    }

    return this.http.get<any[]>(`${this.apiUri}/lotes/filtrar/codigoLote`, { params });
  }


  /**
* Filtrar lotes solo por nombre de lote
* @param nombre Nombre del lote a buscar
* @returns Lista de lotes que coincidan con el nombre de lote
*/
  filtrarLotesPorNombre(nombre: string): Observable<any[]> {
    let params = new HttpParams();
    if (nombre) {
      params = params.set('producto', nombre);
    }

    return this.http.get<any[]>(`${this.apiUri}/lotes/filtrar/nombre`, { params });
  }

   /**
* Filtrar lotes solo por nombre de lote
* @param codigoBarras Nombre del lote a buscar
* @returns Lista de lotes que coincidan con el nombre de lote
*/
/* filtrarLotesPorCodigoBarras(codigoBarras: string): Observable<any[]> {
  let params = new HttpParams();
  if (codigoBarras) {
    params = params.set('producto', codigoBarras);
  }

  return this.http.get<any[]>(`${this.apiUri}/lotes/filtrar/codigoBarras`, { params });
} */


}
