import { Component, output, signal } from '@angular/core';
import { TipoFiltroMedicamento } from '../../app/core/models/medicamento.models';

type TipoBusca = 'medicamento' | 'classe-terapeutica';

@Component({
  selector: 'app-tipo-consulta',
  imports: [],
  templateUrl: './tipo-consulta.html',
  styleUrl: './tipo-consulta.css',
})

export class TipoConsulta {
  protected buscaAtiva = signal<TipoBusca>('medicamento');

  mudouPlaceholder = output<string>();
  tipoSelecionado = output<TipoFiltroMedicamento>();

  setTipoBusca(tipo: TipoBusca): void {
    this.buscaAtiva.set(tipo);
    this.tipoSelecionado.emit(this.paraTipoApi(tipo));

    if (tipo === 'medicamento') {
      this.alterarPlaceholder('Ex: Amoxilina, Metformina, etc.');
    }

    if (tipo === 'classe-terapeutica') {
      this.alterarPlaceholder('Ex: Antibiótico, Anti-hipertensivo…');
    }
  }

  alterarPlaceholder(novoPlaceholder: string): void {
    this.mudouPlaceholder.emit(novoPlaceholder);
  }

  private paraTipoApi(tipo: TipoBusca): TipoFiltroMedicamento {
    return tipo === 'classe-terapeutica' ? 'classeTerapeutica' : 'nome';
  }
}
