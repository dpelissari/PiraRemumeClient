import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavMenu } from '../components/navmenu/nav-menu';
import { Rodape } from '../components/rodape/rodape';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, NavMenu, Rodape],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('PiraRemume');
}
