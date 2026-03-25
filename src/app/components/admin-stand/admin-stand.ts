import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormArray, Validators } from '@angular/forms';
import { Food } from '../../services/food';

@Component({
  selector: 'app-admin-stand',
  imports: [],
  templateUrl: './admin-stand.html',
  styleUrl: './admin-stand.css',
})
export class AdminStand {
  private fb = inject(FormBuilder);
  private foodService = inject(Food);

  // Definiamo il Form: Stand + Array di piatti (Menu)
  standForm = this.fb.group({
    nome: ['', Validators.required],
    posizione: ['', Validators.required],
    menu: this.fb.array([]) // Array dinamico
  });

  // Getter per accedere facilmente all'array del menu nell'HTML
  get menu() {
    return this.standForm.controls["menu"] as FormArray;
  }

  // Metodo per aggiungere un nuovo piatto al menu
  addPiatto() {
    const piattoForm = this.fb.group({
      nomePiatto: ['', Validators.required],
      prezzo: [0, [Validators.required, Validators.min(0.50)]]
    });
    this.menu.push(piattoForm);
  }

  // Metodo per rimuovere un piatto
  removePiatto(index: number) {
    this.menu.removeAt(index);
  }

  onSubmit() {
    if (this.standForm.valid) {
      const standData = this.standForm.value as { nome: string; menu: any[] };
      this.foodService.addStand(standData).subscribe({
        next: (res) => {
          alert('Stand e Menu salvati con successo sul microservizio Spring!');
          this.standForm.reset();
        },
        error: (err) => alert('Errore durante il salvataggio. Controlla i log.')
      });
    }
  }
}
