import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Medicamento } from '../models/medicamento.models';

@Injectable({ providedIn: 'root' }) // Singleton — uma instância em toda a app
export class MedicamentoService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/medicamentos`;

  // endpoint público
  listar(): Observable<Medicamento[]> {
    return this.http.get<Medicamento[]>(this.baseUrl);
  }
  
  // endpoint público
  buscarPorId(id: string): Observable<Medicamento> {
    return this.http.get<Medicamento>(`${this.baseUrl}/${id}`);
  }
}
