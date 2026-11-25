import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, combineLatest, of, startWith, Subject, switchMap } from 'rxjs';
import { Apresentacao, Medicamento, RemumeFonte } from '../../core/models/medicamento.models';
import { MedicamentoService } from '../../core/services/medicamento.service';

@Component({
  selector: 'app-medicamento-detalhe',
  imports: [RouterLink],
  templateUrl: './medicamento-detalhe.html',
})
export class MedicamentoDetalhePage {
  private readonly route = inject(ActivatedRoute);
  private readonly medicamentoService = inject(MedicamentoService);
  private readonly recarregar$ = new Subject<void>();

  medicamento = signal<Medicamento | null>(null);
  fonte = signal<RemumeFonte | null>(null);
  carregando = signal(true);
  erro = signal<string | null>(null);
  naoEncontrado = signal(false);

  constructor() {
    combineLatest([this.route.paramMap, this.recarregar$.pipe(startWith(undefined))])
      .pipe(
        switchMap(([params]) => {
          const id = params.get('id');
          if (!id) {
            this.naoEncontrado.set(true);
            this.erro.set(null);
            this.medicamento.set(null);
            return of(null);
          }

          this.carregando.set(true);
          this.erro.set(null);
          this.naoEncontrado.set(false);

          return this.medicamentoService.buscarPorId(id).pipe(
            catchError((err: HttpErrorResponse) => {
              if (err.status === 404) {
                this.naoEncontrado.set(true);
              } else {
                this.erro.set('Não deu para carregar esse medicamento.');
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
        this.medicamento.set(resposta?.medicamento ?? null);
        this.fonte.set(resposta?.fonte ?? null);
      });
  }

  recarregar(): void {
    this.recarregar$.next();
  }

  resumoOnde(med: Medicamento): string {
    if (med.todasAsFarmacias) {
      return 'Disponível em toda a rede. É dispensado na UBS ou USF do bairro.';
    }
    if (med.apresentacoes.every((item) => item.abrangencia === 'Restrito')) {
      return 'Disponível em algumas farmácias. Veja as unidades de cada forma abaixo.';
    }
    return 'Algumas formas só em farmácias específicas. Confira cada uma abaixo.';
  }

  private static readonly Formas = [
    'cápsula ou comprimido',
    'comprimido revestido',
    'comprimido solúvel',
    'solução oral gotas',
    'suspensão oral',
    'solução oral',
    'geleia vaginal',
    'solução otológica',
    'comprimido',
    'cápsula',
    'xarope',
    'creme',
    'pomada',
  ];

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

  detalheApresentacao(item: Apresentacao): { dose: string; forma: string | null } {
    const descricao = item.descricao.trim();
    const lower = descricao.toLowerCase();

    for (const forma of MedicamentoDetalhePage.Formas) {
      if (!lower.endsWith(forma)) continue;
      const dose = descricao.slice(0, descricao.length - forma.length).trim();
      if (!dose) return { dose: descricao, forma: null };
      return { dose, forma };
    }

    return { dose: descricao, forma: null };
  }
}
