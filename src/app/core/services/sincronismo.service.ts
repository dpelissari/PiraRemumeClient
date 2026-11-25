import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AtualizarSincronismo, Sincronismo } from '../models/sincronismo.models';

@Injectable({ providedIn: 'root' })
export class SincronismoService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/admin/sincronismo`;

  obter(): Observable<Sincronismo> {
    return this.http.get<Sincronismo>(this.baseUrl);
  }

  salvar(pedido: AtualizarSincronismo): Observable<Sincronismo> {
    return this.http.put<Sincronismo>(this.baseUrl, pedido);
  }

  verificar(): Observable<Sincronismo> {
    return this.http.post<Sincronismo>(`${this.baseUrl}/verificar`, {});
  }
}
