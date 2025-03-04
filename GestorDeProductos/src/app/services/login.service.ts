import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from '../config/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = CONFIG.apiUrl+ '/auth/login';

  constructor(private http: HttpClient) { }

  login(usuario: any): Observable<any>{
    return this.http.post<any>(this.apiUrl, usuario);
  }
  
}
