import { Injectable } from '@angular/core';
import { CONFIG } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';  // Asegúrate de importar el modelo

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {
  private apiUri = CONFIG.apiUrl + '/usuarios';

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuario[]> {  // Cambiar el tipo a Usuario[]
    return this.http.get<Usuario[]>(`${this.apiUri}/ver`);
  }

  createUsuario(usuario: Usuario): Observable<Usuario> {  // Cambiar el tipo a Usuario
    return this.http.post<Usuario>(`${this.apiUri}/crear`, usuario);
  }

  updateUsuario(id: string, usuario: Usuario): Observable<Usuario> {  // Cambiar el tipo a Usuario
    return this.http.put<Usuario>(`${this.apiUri}/actualizar/${id}`, usuario);
  }

  deleteUsuario(id: string): Observable<any> {  // Cambiar el nombre de detelete a delete
    return this.http.delete(`${this.apiUri}/borrar/${id}`, { responseType: 'text' });
  }
}