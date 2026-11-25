import { Component, ElementRef, inject, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, debounceTime, distinctUntilChanged, fromEvent, of, Subject } from 'rxjs';
import { TipoConsulta } from '../tipo-consulta/tipo-consulta';
import { TipoFiltroMedicamento } from '../../app/core/models/medicamento.models';
import { MedicamentoService } from '../../app/core/services/medicamento.service';

@Component({
  selector: 'app-painel-consulta',
  imports: [TipoConsulta],
  templateUrl: './painel-consulta.html',
  styleUrl: './painel-consulta.css',
})
export class PainelConsulta {
  private readonly medicamentoService = inject(MedicamentoService);
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly termo$ = new Subject<string>();

  protected termoDigitado = signal('');
  protected grupoSelecionado = signal('');
  protected grupos = signal<string[]>([]);
  protected tipoFiltro = signal<TipoFiltroMedicamento>('nome');
  protected placeHolder = signal('Dipirona, Metformina, Amoxicilina');
  protected menuGruposAberto = signal(false);

  consultou = output<{ termo: string; tipo: TipoFiltroMedicamento }>();

  constructor() {
    this.carregarGrupos();

    this.termo$
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe(() => this.buscar());

    fromEvent<PointerEvent>(document, 'pointerdown')
      .pipe(takeUntilDestroyed())
      .subscribe((evento) => {
        if (!this.menuGruposAberto()) return;
        if (!this.host.nativeElement.contains(evento.target as Node)) {
          this.menuGruposAberto.set(false);
        }
      });

    fromEvent<KeyboardEvent>(document, 'keydown')
      .pipe(takeUntilDestroyed())
      .subscribe((evento) => {
        if (evento.key === 'Escape') {
          this.menuGruposAberto.set(false);
        }
      });
  }

  private carregarGrupos(): void {
    this.medicamentoService
      .listarGrupos()
      .pipe(
        catchError((err) => {
          console.error(err);
          return of<string[]>([]);
        }),
      )
      .subscribe((grupos) => this.grupos.set(grupos));
  }

  aoDigitar(evento: Event): void {
    const input = evento.target as HTMLInputElement;
    this.termoDigitado.set(input.value);
    this.termo$.next(input.value);
  }

  alternarGrupos(): void {
    this.menuGruposAberto.update((aberto) => !aberto);
  }

  escolherGrupo(grupo: string): void {
    this.grupoSelecionado.set(grupo);
    this.menuGruposAberto.set(false);
    this.buscar();
  }

  atualizarTipo(tipo: TipoFiltroMedicamento): void {
    this.tipoFiltro.set(tipo);
    this.termoDigitado.set('');
    this.grupoSelecionado.set('');
    this.menuGruposAberto.set(false);
    if (tipo === 'grupo' && this.grupos().length === 0) {
      this.carregarGrupos();
    }
    this.buscar();
  }

  buscar(): void {
    const tipo = this.tipoFiltro();
    this.consultou.emit({
      termo: tipo === 'grupo' ? this.grupoSelecionado() : this.termoDigitado().trim(),
      tipo,
    });
  }

  aoSubmeter(evento: Event): void {
    evento.preventDefault();
    this.buscar();
  }
}
