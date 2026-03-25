import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  if (authService.isAdmin()) {
    return true; // Accesso consentito
  } else {
    alert('Accesso negato! Solo gli amministratori possono entrare qui.');
    router.navigate(['/login']);
    return false; // Blocca la navigazione
  }
};