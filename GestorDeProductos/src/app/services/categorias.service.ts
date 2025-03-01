import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
   private apiUri = CONFIG.apiUrl + '/categorias';

  constructor(private http: HttpClient) { }

  getCategorias(){
    return this.http.get<any[]>(`${this.apiUri}/ver`)
  }
}
