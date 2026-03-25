import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class Auth {
  private http = inject(HttpClient);
  // Cambia le porte con quelle effettive dei tuoi microservizi Spring
  private readonly API_URL = environment.authUrl;; 

  login(credentials: any) {
    return this.http.post<{token: string}>(`${this.API_URL}/login`, credentials).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        // Decodifica il payload del JWT per leggere il ruolo (es. ROLE_ADMIN)
        const payload = JSON.parse(atob(res.token.split('.')[1]));
        localStorage.setItem('role', payload.role);
      })
    );
  }

  getToken() { return localStorage.getItem('token'); }
  
  isAdmin(): boolean {
    return localStorage.getItem('role') === 'ROLE_ADMIN';
  }
}