import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);

  // Definiamo i campi del form
  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  errorMessage: string = '';

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login effettuato!', response);
          // Se è admin lo mandiamo alla gestione stand, altrimenti alla home
          if (this.authService.isAdmin()) {
            this.router.navigate(['/admin/stands']);
          } else {
            this.router.navigate(['/home']);
          }
        },
        error: (err) => {
          this.errorMessage = 'Credenziali errate o server non raggiungibile';
          console.error(err);
        }
      });
    }
  }
}
