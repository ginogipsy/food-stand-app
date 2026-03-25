import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { AdminStand } from './components/admin-stand/admin-stand';
import { adminGuard } from './guards/admin-guard'; // Importa la guard

export const routes: Routes = [
  { path: 'login', component: Login },
  { 
    path: 'admin/stands', 
    component: AdminStand, 
    canActivate: [adminGuard] // <--- Qui attiviamo il controllo
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];