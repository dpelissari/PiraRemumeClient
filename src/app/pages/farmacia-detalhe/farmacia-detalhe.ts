import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, combineLatest, of, startWith, Subject, switchMap } from 'rxjs';
import { Farmacia, FarmaciaFonte } from '../../core/models/farmacia.models';
import { FarmaciaService } from '../../core/services/farmacia.service';

@Component({
  selector: 'app-farmacia-detalhe',
  imports: [RouterLink],
  templateUrl: './farmacia-detalhe.html',
})
export class FarmaciaDetalhePage {
  private readonly route = inject(ActivatedRoute);
  private readonly farmaciaService = inject(FarmaciaService);
  private readonly recarregar$ = new Subject<void>();

  farmacia = signal<Farmacia | null>(null);
  fonte = signal<FarmaciaFonte | null>(null);
  carregando = signal(true);
  erro = signal<string | null>(null);
  naoEncontrado = signal(false);

  constructor() {
    combineLatest([this.route.paramMap, this.recarregar$.pipe(startWith(undefined))])
      .pipe(
        switchMap(([params]) => {
          const slug = params.get('slug');
          if (!slug) {
            this.naoEncontrado.set(true);
            this.erro.set(null);
            this.farmacia.set(null);
            return of(null);
          }

          this.carregando.set(true);
          this.erro.set(null);
          this.naoEncontrado.set(false);

          return this.farmaciaService.buscarPorSlug(slug).pipe(
            catchError((err: HttpErrorResponse) => {
              if (err.status === 404) {
                this.naoEncontrado.set(true);
              } else {
                this.erro.set('Não deu para carregar essa farmácia.');
              }
              console.error(err);
              return of(null);
            }),
          );
        }),
        takeUntilDestroyed(),
      )
      .subscribe((resposta) => {
        this.carregando.set(false);
        this.farmacia.set(resposta?.farmacia ?? null);
        this.fonte.set(resposta?.fonte ?? null);
      });
  }

  recarregar(): void {
    this.recarregar$.next();
  }

  formatarData(valor: string): string {
    const iso = /^\d{4}-\d{2}$/.test(valor) ? `${valor}-01` : valor;
    const data = new Date(`${iso}T00:00:00`);
    if (Number.isNaN(data.getTime())) {
      return valor;
    }

    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(data);
  }

  formatarTelefone(telefone: string): string {
    const digitos = telefone.replace(/\D/g, '');
    if (digitos.length === 8) {
      return `(19) ${digitos.slice(0, 4)}-${digitos.slice(4)}`;
    }
    if (digitos.length === 9) {
      return `(19) ${digitos.slice(0, 5)}-${digitos.slice(5)}`;
    }
    return telefone;
  }

  telHref(telefone: string): string {
    return `tel:+5519${telefone.replace(/\D/g, '')}`;
  }

  whatsappHref(telefone: string): string {
    return `https://wa.me/5519${telefone.replace(/\D/g, '')}`;
  }

  mapsHref(farmacia: Farmacia): string {
    const query = `${farmacia.endereco}, ${farmacia.bairro}, Piracicaba, SP`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  }
}
