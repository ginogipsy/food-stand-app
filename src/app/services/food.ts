import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from '../../environments/environment';
import { Observable, switchMap, forkJoin, of } from 'rxjs';

export interface LocalizedText {
  it: string;
  en: string;
}

export interface StandCreate {
  number: number;
  name: string;
  description: LocalizedText;
  firstParticipationYear: number;
  latitude: number;
  longitude: number;
}

export interface MenuItemCreate {
  name: string;
  description: LocalizedText;
  availablePlates: number;
  kind: 'FOOD' | 'DRINK';
  keywords?: string[];
}

@Injectable({
  providedIn: 'root',
})
export class Food {
  private http = inject(HttpClient);
  private readonly STANDS_URL = environment.standsUrl;

  /**
   * Crea un nuovo stand e poi aggiunge tutti i piatti al menu.
   * Mostra una vera orchestrazione lato client.
   */
  addStandWithMenu(stand: StandCreate, menu: MenuItemCreate[]): Observable<any> {
    return this.http.post<any>(this.STANDS_URL, stand).pipe(
      switchMap(newStand => {
        if (menu.length === 0) return of(newStand);

        // Per ogni piatto, facciamo una chiamata POST all'endpoint del menu dello stand appena creato
        const menuRequests = menu.map(item =>
          this.http.post(`${this.STANDS_URL}/${newStand.id}/menu-items`, item)
        );

        return forkJoin(menuRequests).pipe(
          switchMap(() => of(newStand))
        );
      })
    );
  }

  // Supporto per aggiornamento stand esistente
  updateStandMenu(standId: string, item: MenuItemCreate) {
    return this.http.post(`${this.STANDS_URL}/${standId}/menu-items`, item);
  }
}
