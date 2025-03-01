import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONFIG } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class AlmacenistasService {
  private apiUri = CONFIG.apiUrl + '/proveedores';

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

}
