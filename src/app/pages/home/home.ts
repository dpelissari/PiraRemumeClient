import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PainelConsulta } from '../../../components/painel-consulta/painel-consulta';
import { ListaMedicamentos } from '../../../components/lista-medicamentos/lista-medicamentos';
import { TipoFiltroMedicamento } from '../../core/models/medicamento.models';

@Component({
  selector: 'app-home',
  imports: [PainelConsulta, ListaMedicamentos, RouterLink],
  templateUrl: './home.html',
})
export class Home {
  protected readonly filtroTermo = signal('');
  protected readonly filtroTipo = signal<TipoFiltroMedicamento>('nome');

  aplicarConsulta(filtro: { termo: string; tipo: TipoFiltroMedicamento }): void {
    if (this.filtroTermo() === filtro.termo && this.filtroTipo() === filtro.tipo) {
      return;
    }
    this.filtroTermo.set(filtro.termo);
    this.filtroTipo.set(filtro.tipo);
  }
}
