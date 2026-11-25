import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
})
export class LoginPage {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  nomeUsuario = '';
  senha = '';
  senhaVisivel = signal(false);
  enviando = signal(false);
  erro = signal<string | null>(null);

  constructor() {
    if (this.auth.ehAdmin()) {
      void this.router.navigateByUrl('/admin/sincronismo');
    }
  }

  entrar(): void {
    if (this.enviando()) return;
    this.enviando.set(true);
    this.erro.set(null);

    this.auth.entrar({ nomeUsuario: this.nomeUsuario.trim(), senha: this.senha }).subscribe({
      next: () => {
        const destino = this.route.snapshot.queryParamMap.get('returnUrl') || '/admin/sincronismo';
        void this.router.navigateByUrl(destino);
      },
      error: (err: HttpErrorResponse) => {
        this.enviando.set(false);
        this.erro.set(
          err.status === 401
            ? 'Usuário ou senha não conferem.'
            : 'Não deu para entrar. Tente de novo.',
        );
      },
    });
  }
}
