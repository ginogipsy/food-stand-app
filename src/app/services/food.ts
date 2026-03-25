import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Food {
    private http = inject(HttpClient);
  private readonly FOOD_URL = environment.foodUrl;

  addStand(stand: { nome: string, menu: any[] }) {
    return this.http.post(`${this.FOOD_URL}/stands`, stand);
  }
}
