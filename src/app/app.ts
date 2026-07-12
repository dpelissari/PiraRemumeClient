import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// components
import { NavMenu } from "../components/navmenu/nav-menu";
import { PainelConsulta } from "../components/painel-consulta/painel-consulta";
import { ListaMedicamentos } from '../components/lista-medicamentos/lista-medicamentos';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavMenu,
    PainelConsulta,
    ListaMedicamentos
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('MedClient');
}