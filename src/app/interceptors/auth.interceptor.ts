import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Recuperiamo il token dal localStorage
  const token = localStorage.getItem('token');

  // 2. Se il token esiste, cloniamo la richiesta originale aggiungendo l'header
  // IMPORTANTE: Le richieste HTTP in Angular sono immutabili, quindi dobbiamo "clonarle"
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    // 3. Inviamo la richiesta modificata
    return next(authReq);
  }

  // 4. Se non c'è il token (es. durante il login), inviamo la richiesta originale
  return next(req);
};