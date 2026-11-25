import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Medicamento, MedicamentoDetalheResponse, RemumeFonte, TipoFiltroMedicamento } from '../models/medicamento.models';
import { ResultadoPaginado } from '../models/paginacao.models';

export interface ResultadoRemume extends ResultadoPaginado<Medicamento> {
  fonte?: RemumeFonte;
}

@Injectable({ providedIn: 'root' })
export class MedicamentoService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/medicamentos`;

  listar(
    pagina = 1,
    tamanho = 12,
    termo?: string,
    tipo?: TipoFiltroMedicamento,
  ): Observable<ResultadoRemume> {
    let params = new HttpParams().set('pagina', pagina).set('tamanho', tamanho);

    const termoLimpo = termo?.trim();
    if (termoLimpo) {
      params = params.set('termo', termoLimpo);
      if (tipo) {
        params = params.set('tipo', tipo);
      }
    }

    return this.http.get<ResultadoRemume>(this.baseUrl, { params });
  }

  listarGrupos(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/grupos`);
  }

  buscarPorId(id: string): Observable<MedicamentoDetalheResponse> {
    return this.http.get<MedicamentoDetalheResponse>(`${this.baseUrl}/${id}`);
  }
}
