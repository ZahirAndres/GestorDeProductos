import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class FiltrosService {
  private apiUrl = CONFIG.apiUrl + "/productos/filtroAyudante";

  constructor(private http: HttpClient) { }


  getProductosPorCategoria(categoria: string){
    return this.http.get<any[]>(`${this.apiUrl}/buscarPorCategoria/${categoria}`);
  }

  getProductosPorNombre(nombre: String){
    return this.http.get<any[]>(`${this.apiUrl}/buscarPorNombre/${nombre}`);
  }

  getProductosPorCodigo(codigo: String){
    return this.http.get<any[]>(`${this.apiUrl}/buscarPorCodigo/${codigo}`);
  }

  getProductosPasilloDefecto(){
    return this.http.get<any[]>(`${this.apiUrl}/ProductosDefectoPasillo`);
  }

  actualizarCantidadExistente(cantidadAgregada: number, codigoBarras: String){
    return this.http.put<any>(`${this.apiUrl}/actualizarExistenciaPasillo/${codigoBarras}`, cantidadAgregada );
  }
}
