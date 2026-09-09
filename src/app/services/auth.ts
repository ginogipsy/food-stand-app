import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class Auth {
  private http = inject(HttpClient);
  private readonly API_URL = environment.authUrl;

  login(credentials: any) {
    return this.http.post<{token: string}>(`${this.API_URL}/login`, credentials).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        // Decodifica il payload del JWT in modo sicuro
        try {
          const decoded: any = jwtDecode(res.token);
          localStorage.setItem('role', decoded.role || '');
          localStorage.setItem('username', decoded.sub || '');
          // Recuperiamo l'ID dello stand associato all'utente (se presente)
          if (decoded.standId) {
            localStorage.setItem('standId', decoded.standId);
          }
        } catch (e) {
          console.error('Errore durante la decodifica del token', e);
        }
      })
    );
  }

  getToken() { return localStorage.getItem('token'); }

  getUserRole(): string {
    return localStorage.getItem('role') || '';
  }

  getStandId(): string | null {
    return localStorage.getItem('standId');
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'ROLE_ADMIN';
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    localStorage.removeItem('standId');
  }
}
