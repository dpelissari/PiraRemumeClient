import { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Subject, catchError, debounceTime, distinctUntilChanged, of, startWith, switchMap } from 'rxjs';
import { CardFarmacia } from '../../../components/card-farmacia/card-farmacia';
import { ModalFarmacia } from '../../../components/modal-farmacia/modal-farmacia';
import { Farmacia, FarmaciaFonte } from '../../core/models/farmacia.models';
import { FarmaciaService } from '../../core/services/farmacia.service';

@Component({
  selector: 'app-farmacias',
  imports: [RouterLink, CardFarmacia, ModalFarmacia],
  templateUrl: './farmacias.html',
  styleUrl: './farmacias.css',
})
export class FarmaciasPage {
  private readonly farmaciaService = inject(FarmaciaService);
  private readonly busca$ = new Subject<string>();

  farmacias = signal<Farmacia[]>([]);
  fonte = signal<FarmaciaFonte | null>(null);
  termo = signal('');
  carregando = signal(true);
  erro = signal<string | null>(null);
  farmaciaAberta = signal<Farmacia | null>(null);

  atencaoBasica = computed(() => this.farmacias().filter((f) => f.tipo === 'AtencaoBasica'));
  outras = computed(() => this.farmacias().filter((f) => f.tipo !== 'AtencaoBasica'));

  constructor() {
    this.busca$
      .pipe(
        startWith(''),
        debounceTime(250),
        distinctUntilChanged(),
        switchMap((termo) => {
          this.carregando.set(true);
          this.erro.set(null);
          return this.farmaciaService.listar(termo).pipe(
            catchError((err: HttpErrorResponse) => {
              this.erro.set(
                err.status === 0
                  ? 'Não deu para carregar agora. Veja se a API está no ar e tente de novo.'
                  : 'Não deu para carregar as farmácias agora.',
              );
              console.error(err);
              return of(null);
            }),
          );
        }),
        takeUntilDestroyed(),
      )
      .subscribe((resposta) => {
        this.carregando.set(false);
        if (!resposta) {
          this.farmacias.set([]);
          return;
        }
        this.farmacias.set(resposta.itens ?? []);
        this.fonte.set(resposta.fonte ?? null);
      });
  }

  aoDigitar(evento: Event): void {
    const valor = (evento.target as HTMLInputElement).value;
    this.termo.set(valor);
    this.busca$.next(valor.trim());
  }

  recarregar(): void {
    this.busca$.next(this.termo().trim());
  }

  abrirEndereco(farmacia: Farmacia): void {
    this.farmaciaAberta.set(farmacia);
  }

  fecharEndereco(): void {
    this.farmaciaAberta.set(null);
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
}
