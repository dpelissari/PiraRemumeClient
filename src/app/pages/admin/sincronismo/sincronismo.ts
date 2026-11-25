import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Sincronismo } from '../../../core/models/sincronismo.models';
import { SincronismoService } from '../../../core/services/sincronismo.service';

@Component({
  selector: 'app-sincronismo',
  imports: [FormsModule],
  templateUrl: './sincronismo.html',
})
export class SincronismoPage {
  private readonly sincronismoService = inject(SincronismoService);

  urlFonte = '';
  urlFarmacias = '';
  intervaloDias = 30;
  ativo = true;
  config = signal<Sincronismo | null>(null);
  carregando = signal(true);
  salvando = signal(false);
  verificando = signal(false);
  erro = signal<string | null>(null);
  aviso = signal<string | null>(null);

  readonly intervalos = [
    { valor: 1, rotulo: '1 dia' },
    { valor: 7, rotulo: '7 dias' },
    { valor: 30, rotulo: '30 dias' },
  ];

  constructor() {
    this.carregar();
  }

  carregar(): void {
    this.carregando.set(true);
    this.erro.set(null);
    this.sincronismoService.obter().subscribe({
      next: (config) => this.aplicar(config),
      error: (err: HttpErrorResponse) => {
        this.carregando.set(false);
        this.erro.set(this.mensagemErro(err, 'Não deu para carregar o sincronismo.'));
      },
    });
  }

  salvar(): void {
    if (this.salvando()) return;
    this.salvando.set(true);
    this.erro.set(null);
    this.aviso.set(null);
    this.sincronismoService
      .salvar({
        urlFonte: this.urlFonte.trim(),
        urlFarmacias: this.urlFarmacias.trim(),
        intervaloDias: Number(this.intervaloDias),
        ativo: this.ativo,
      })
      .subscribe({
        next: (config) => {
          this.aplicar(config);
          this.aviso.set('Configuração salva. A verificação usa este intervalo e os dois endereços.');
        },
        error: (err: HttpErrorResponse) => {
          this.salvando.set(false);
          this.erro.set(this.mensagemErro(err, 'Não deu para salvar.'));
        },
      });
  }

  verificarAgora(): void {
    if (this.verificando()) return;
    this.verificando.set(true);
    this.erro.set(null);
    this.aviso.set(null);
    this.sincronismoService.verificar().subscribe({
      next: (config) => {
        this.aplicar(config);
        this.aviso.set(config.ultimaMensagem);
      },
      error: (err: HttpErrorResponse) => {
        this.verificando.set(false);
        this.erro.set(this.mensagemErro(err, 'Não deu para verificar agora.'));
      },
    });
  }

  formatarData(valor: string | null): string {
    if (!valor) return 'Ainda não rodou';
    const data = new Date(valor);
    if (Number.isNaN(data.getTime())) return valor;
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(data);
  }

  rotuloStatus(status: string | null): string {
    switch (status) {
      case 'SemAlteracao':
        return 'Sem alteração';
      case 'FonteAlterou':
        return 'Fonte mudou';
      case 'CatalogoAtualizado':
        return 'Catálogo atualizado';
      case 'PrimeiraLeitura':
        return 'Primeira leitura';
      case 'Erro':
        return 'Erro';
      default:
        return 'Ainda não verificou';
    }
  }

  private aplicar(config: Sincronismo): void {
    this.config.set(config);
    this.urlFonte = config.urlFonte;
    this.urlFarmacias = config.urlFarmacias;
    this.intervaloDias = config.intervaloDias;
    this.ativo = config.ativo;
    this.carregando.set(false);
    this.salvando.set(false);
    this.verificando.set(false);
  }

  private mensagemErro(err: HttpErrorResponse, fallback: string): string {
    if (err.status === 400 && err.error?.errors) {
      const primeiro = Object.values(err.error.errors).flat()[0];
      if (typeof primeiro === 'string') return primeiro;
    }
    return fallback;
  }
}
