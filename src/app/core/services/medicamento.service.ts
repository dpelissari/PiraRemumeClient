import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Medicamento } from '../models/medicamento.models';
import { ResultadoPaginado } from '../models/paginacao.models';

@Injectable({ providedIn: 'root' })
export class MedicamentoService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/medicamentos`;

  listar(pagina = 1, tamanho = 12): Observable<ResultadoPaginado<Medicamento>> {
    const params = new HttpParams()
      .set('pagina', pagina)
      .set('tamanho', tamanho);

    return this.http.get<ResultadoPaginado<Medicamento>>(this.baseUrl, { params });
  }

  buscarPorId(id: string): Observable<Medicamento> {
    return this.http.get<Medicamento>(`${this.baseUrl}/${id}`);
  }
}
