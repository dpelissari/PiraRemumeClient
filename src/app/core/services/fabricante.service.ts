import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Fabricante } from '../models/fabricante.models';

@Injectable({ providedIn: 'root' }) // Singleton — uma instância em toda a app
export class FabricanteService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/fabricantes`;

  // endpoint público
  listar(): Observable<Fabricante[]> {
    return this.http.get<Fabricante[]>(this.baseUrl);
  }
  
  // endpoint público
  buscarPorId(id: string): Observable<Fabricante> {
    return this.http.get<Fabricante>(`${this.baseUrl}/${id}`);
  }
}
