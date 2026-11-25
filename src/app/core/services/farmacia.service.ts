import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FarmaciaDetalheResponse, FarmaciasResponse, TipoFarmacia } from '../models/farmacia.models';

@Injectable({ providedIn: 'root' })
export class FarmaciaService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/farmacias`;

  listar(termo?: string, tipo?: TipoFarmacia): Observable<FarmaciasResponse> {
    let params = new HttpParams();
    const termoLimpo = termo?.trim();
    if (termoLimpo) {
      params = params.set('termo', termoLimpo);
    }
    if (tipo) {
      params = params.set('tipo', tipo);
    }

    return this.http.get<FarmaciasResponse>(this.baseUrl, { params });
  }

  buscarPorSlug(slug: string): Observable<FarmaciaDetalheResponse> {
    return this.http.get<FarmaciaDetalheResponse>(`${this.baseUrl}/${slug}`);
  }
}
