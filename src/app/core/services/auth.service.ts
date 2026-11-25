import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginPedido, LoginResposta, Sessao } from '../models/auth.models';

const CHAVE = 'piraremume.sessao';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly sessao = signal<Sessao | null>(lerSessao());

  readonly logado = computed(() => {
    const atual = this.sessao();
    return !!atual && !expirou(atual.expiraEm);
  });
  readonly ehAdmin = computed(() => this.logado() && this.sessao()?.perfil === 'Admin');
  readonly nome = computed(() => this.sessao()?.nome ?? null);
  readonly token = computed(() => (this.logado() ? this.sessao()?.token ?? null : null));

  constructor() {
    if (this.sessao() && !this.logado()) {
      this.sair(false);
    }
  }

  entrar(pedido: LoginPedido) {
    return this.http.post<LoginResposta>(`${environment.apiUrl}/login`, pedido).pipe(
      tap((resposta) => {
        const sessao: Sessao = {
          token: resposta.token,
          nome: resposta.nome,
          perfil: resposta.perfil,
          expiraEm: resposta.expiraEm,
        };
        localStorage.setItem(CHAVE, JSON.stringify(sessao));
        this.sessao.set(sessao);
      }),
    );
  }

  sair(redirecionar = true): void {
    localStorage.removeItem(CHAVE);
    this.sessao.set(null);
    if (redirecionar) {
      void this.router.navigateByUrl('/login');
    }
  }
}

function lerSessao(): Sessao | null {
  try {
    const bruto = localStorage.getItem(CHAVE);
    if (!bruto) return null;
    return JSON.parse(bruto) as Sessao;
  } catch {
    return null;
  }
}

function expirou(expiraEm: string): boolean {
  const data = new Date(expiraEm);
  return Number.isNaN(data.getTime()) || data.getTime() <= Date.now();
}
