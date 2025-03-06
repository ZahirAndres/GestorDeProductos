import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONFIG } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUri = CONFIG.apiUrl + '/productos';


  constructor(private http: HttpClient) { }

  getProductos() {
    return this.http.get<any[]>(`${this.apiUri}/ver`);
  }

  createProducto(producto: any): Observable<any> {
    return this.http.post<any>(`${this.apiUri}/crear`, producto);
  }

  updateProducto(producto: any): Observable<any> {
    return this.http.put<any[]>(`${this.apiUri}/actualizar`, producto);
  }

  deleteProducto(id: string): Observable<any> {
    return this.http.delete(`${this.apiUri}/borrar/${id}`, { responseType: 'text' });
  }

  updateStock(id: string, nuevoStock: number): Observable<any> {
    return this.http.put(`${this.apiUri}/actualizar-stock/${id}`, { stockExhibe: nuevoStock });
  }
}
