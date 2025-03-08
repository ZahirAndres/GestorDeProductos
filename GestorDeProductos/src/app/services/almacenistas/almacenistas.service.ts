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
   * Filtrar lotes solo por código de barras
   * @param codigoBarras - codigo de barras del producto a buscar
   * @returns - lista de lotes que coincidan con el código de barras
   */
  buscarProductoPorCodigoBarras(codigoBarras: string): Observable<any> {
    return this.http.get<any>(`${this.apiUri}/lotes/productos/buscarPorCodigoBarras/${codigoBarras}`);
  }


  /** ==============================
   * FILTROS PARA PRODUCTOS (ALMACENISTA)
   * ============================== */

  /**
   * Filtrar productos por categoría
   * @param categoria Categoría del producto 
   * @returns Lista de productos filtrados
   */
  filtrarPorCategoria(categoria: string) {
    return this.http.get<any[]>(`${this.apiUri}/filtros/categoria/${categoria}`);
  }

  /**
   * Filtrar productos por nombre de producto
   * @param nombre Nombre del producto
   * @returns Lista de productos filtrados
   */
  filtrarPorNombre(nombre: string) {
    return this.http.get<any[]>(`${this.apiUri}/filtros/nombreProducto/${nombre}`);
  }

  /**
   * Filtrar producto por código de barras
   * @param codigoBarras Código de barras del producto
   * @returns Producto encontrado
   */
  filtrarPorCodigoBarras(codigoBarras: string) {
    return this.http.get<any[]>(`${this.apiUri}/filtros/codigoBarras/${codigoBarras}`);
  }

  /**
   * Filtrar productos por categoría y nombre
   * @param categoria Categoría del producto
   * @param nombre Nombre del producto
   * @returns Lista de productos filtrados
   */
  // filtrarPorCategoriaYNombre(categoria: string, nombre: string): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUri}/filtros/categoriaYNomb/${categoria}/${nombre}`);
  // }

  /**
   * Filtrar productos con existencias mínimas 
   * @returns Lista de productos con stock bajo
   */
  // filtrarPorExistenciasMinimas(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUri}/filtros/existenciasMinimas`);
  // }


}
