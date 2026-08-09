import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// components
import { NavMenu } from "../components/navmenu/nav-menu";
import { PainelConsulta } from "../components/painel-consulta/painel-consulta";
import { ListaMedicamentos } from '../components/lista-medicamentos/lista-medicamentos';
import { Rodape } from "../components/rodape/rodape";

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
}