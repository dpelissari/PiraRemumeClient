import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// components
import { NavMenu } from "../components/navmenu/nav-menu";
import { PainelConsulta } from "../components/painel-consulta/painel-consulta";
import { ListaMedicamentos } from '../components/lista-medicamentos/lista-medicamentos';
import { Rodape } from "../components/rodape/rodape";
import { TipoFiltroMedicamento } from './core/models/medicamento.models';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavMenu,
    PainelConsulta,
    ListaMedicamentos,
    Rodape
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('MedClient');
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