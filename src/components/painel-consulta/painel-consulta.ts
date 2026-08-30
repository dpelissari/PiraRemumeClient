import { Component, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { TipoConsulta } from '../tipo-consulta/tipo-consulta';
import { TipoFiltroMedicamento } from '../../app/core/models/medicamento.models';

@Component({
  selector: 'app-painel-consulta',
  imports: [TipoConsulta],
  templateUrl: './painel-consulta.html',
  styleUrl: './painel-consulta.css',
})
export class PainelConsulta {
  private readonly termo$ = new Subject<string>();

  protected termoDigitado = signal('');
  protected tipoFiltro = signal<TipoFiltroMedicamento>('nome');
  protected placeHolder = signal('Ex: Amoxilina, Metformina, etc.');

  consultou = output<{ termo: string; tipo: TipoFiltroMedicamento }>();

  constructor() {
    this.termo$
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe(() => this.buscar());
  }

  aoDigitar(evento: Event): void {
    const input = evento.target as HTMLInputElement;
    this.termoDigitado.set(input.value);
    this.termo$.next(input.value);
  }

  atualizarTipo(tipo: TipoFiltroMedicamento): void {
    this.tipoFiltro.set(tipo);
    if (this.termoDigitado().trim()) {
      this.buscar();
    }
  }

  atualizarPlaceHolder(texto: string): void {
    this.placeHolder.set(texto);
  }

  buscar(): void {
    this.consultou.emit({
      termo: this.termoDigitado().trim(),
      tipo: this.tipoFiltro(),
    });
  }

  aoSubmeter(evento: Event): void {
    evento.preventDefault();
    this.buscar();
  }
}
