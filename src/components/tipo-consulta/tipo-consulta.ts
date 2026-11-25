import { Component, output, signal } from '@angular/core';
import { TipoFiltroMedicamento } from '../../app/core/models/medicamento.models';

type TipoBusca = 'medicamento' | 'grupo';

@Component({
  selector: 'app-tipo-consulta',
  imports: [],
  templateUrl: './tipo-consulta.html',
  styleUrl: './tipo-consulta.css',
})
export class TipoConsulta {
  protected buscaAtiva = signal<TipoBusca>('medicamento');

  tipoSelecionado = output<TipoFiltroMedicamento>();

  setTipoBusca(tipo: TipoBusca): void {
    this.buscaAtiva.set(tipo);
    this.tipoSelecionado.emit(tipo === 'grupo' ? 'grupo' : 'nome');
  }
}
