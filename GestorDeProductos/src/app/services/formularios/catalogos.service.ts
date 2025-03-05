import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from '../../config/config';

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


}
 