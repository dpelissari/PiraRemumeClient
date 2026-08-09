import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Fabricante } from '../models/fabricante.models';
import { ResultadoPaginado } from '../models/paginacao.models';

@Injectable({ providedIn: 'root' }) // Singleton — uma instância em toda a app
export class FabricanteService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/fabricantes`;

  // endpoint público — API retorna ResultadoPaginado, não Fabricante[]
  listar(pagina = 1, tamanho = 100): Observable<Fabricante[]> {
    const params = new HttpParams()
      .set('pagina', pagina)
      .set('tamanho', tamanho);

    return this.http
      .get<ResultadoPaginado<Fabricante>>(this.baseUrl, { params })
      .pipe(map((resultado) => resultado.itens ?? []));
  }
  
  // endpoint público
  buscarPorId(id: string): Observable<Fabricante> {
    return this.http.get<Fabricante>(`${this.baseUrl}/${id}`);
  }
}
