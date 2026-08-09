import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Medicamento } from '../models/medicamento.models';
import { ResultadoPaginado } from '../models/paginacao.models';

@Injectable({ providedIn: 'root' }) // Singleton — uma instância em toda a app
export class MedicamentoService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/medicamentos`;

  // endpoint público — API retorna ResultadoPaginado, não Medicamento[]
  listar(pagina = 1, tamanho = 100): Observable<Medicamento[]> {
    const params = new HttpParams()
      .set('pagina', pagina)
      .set('tamanho', tamanho);

    return this.http
      .get<ResultadoPaginado<Medicamento>>(this.baseUrl, { params })
      .pipe(map((resultado) => resultado.itens ?? []));
  }
  
  // endpoint público
  buscarPorId(id: string): Observable<Medicamento> {
    return this.http.get<Medicamento>(`${this.baseUrl}/${id}`);
  }
}
