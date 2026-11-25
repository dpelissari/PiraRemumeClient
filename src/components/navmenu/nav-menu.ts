import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../app/core/services/auth.service';
import { SeletorTema } from '../seletor-tema/seletor-tema';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, SeletorTema],
  templateUrl: './nav-menu.html',
  styleUrl: './nav-menu.css',
})
export class NavMenu {
  private readonly auth = inject(AuthService);
  menuAberto = signal(false);
  readonly ehAdmin = this.auth.ehAdmin;

  sair(): void {
    this.menuAberto.set(false);
    this.auth.sair();
  }
}
