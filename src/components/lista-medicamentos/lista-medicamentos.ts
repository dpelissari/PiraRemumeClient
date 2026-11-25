import { Component, computed, effect, inject, input, signal, untracked } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, of, Subject, switchMap } from 'rxjs';
import { CardMedicamento } from '../card-medicamento/card-medicamento';
import { MedicamentoService } from '../../app/core/services/medicamento.service';
import { Medicamento, RemumeFonte, TipoFiltroMedicamento } from '../../app/core/models/medicamento.models';

@Component({
  selector: 'app-lista-medicamentos',
  imports: [CardMedicamento],
  templateUrl: './lista-medicamentos.html',
  styleUrl: './lista-medicamentos.css',
})
export class ListaMedicamentos {
  private readonly medicamentoService = inject(MedicamentoService);
  private readonly tamanhoPagina = 12;

  termo = input('');
  tipo = input<TipoFiltroMedicamento>('nome');
  titulo = input('Medicamentos');

  medicamentos = signal<Medicamento[]>([]);
  fonte = signal<RemumeFonte | null>(null);
  pagina = signal(1);
  total = signal(0);
  totalPaginas = signal(1);
  carregandoInicial = signal(true);
  carregando = signal(false);
  erro = signal<string | null>(null);

  temAnterior = computed(() => this.pagina() > 1);
  temProxima = computed(() => this.pagina() < this.totalPaginas());

  private readonly paginaPedido = new Subject<number>();

  constructor() {
    this.paginaPedido
      .pipe(
        switchMap((pagina) => {
          this.carregando.set(true);
          this.erro.set(null);
          return this.medicamentoService.listar(pagina, this.tamanhoPagina, this.termo(), this.tipo()).pipe(
            catchError((err) => {
              const status = err?.status;
              this.erro.set(
                status === 0
                  ? 'Não deu para carregar a lista agora. Veja se a API está no ar e tente de novo.'
                  : 'Não deu para carregar os medicamentos agora.',
              );
              console.error(err);
              return of(null);
            }),
          );
        }),
        takeUntilDestroyed(),
      )
      .subscribe((resultado) => {
        this.carregando.set(false);
        this.carregandoInicial.set(false);
        if (!resultado) return;

        this.medicamentos.set(resultado.itens ?? []);
        this.fonte.set(resultado.fonte ?? null);
        this.pagina.set(resultado.pagina);
        this.total.set(resultado.total);
        this.totalPaginas.set(
          this.resolverTotalPaginas(resultado.totalPaginas, resultado.total, resultado.tamanho),
        );
      });

    effect(() => {
      this.termo();
      this.tipo();
      untracked(() => this.carregar(1));
    });
  }

  carregar(pagina: number): void {
    this.paginaPedido.next(pagina);
  }

  paginaAnterior(): void {
    if (!this.temAnterior() || this.carregando()) return;
    this.carregar(this.pagina() - 1);
  }

  paginaProxima(): void {
    if (!this.temProxima() || this.carregando()) return;
    this.carregar(this.pagina() + 1);
  }

  private resolverTotalPaginas(totalPaginas: number, total: number, tamanho?: number): number {
    if (Number.isFinite(totalPaginas) && totalPaginas >= 1) {
      return totalPaginas;
    }

    const tamanhoEfetivo = tamanho && tamanho > 0 ? tamanho : this.tamanhoPagina;
    const calculado = Math.ceil((total || 0) / tamanhoEfetivo);
    return Math.max(Number.isFinite(calculado) ? calculado : 1, 1);
  }
}
