import { Injectable, signal } from '@angular/core';

export type Tema = 'claro' | 'escuro' | 'sistema';

const CHAVE = 'piraremume.tema';

@Injectable({ providedIn: 'root' })
export class TemaService {
  readonly tema = signal<Tema>(lerTema());

  constructor() {
    this.aplicar();
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', () => {
      if (this.tema() === 'sistema') {
        this.aplicar();
      }
    });
  }

  definir(tema: Tema): void {
    this.tema.set(tema);
    localStorage.setItem(CHAVE, tema);
    this.aplicar();
  }

  private aplicar(): void {
    const escuro = this.tema() === 'escuro' || (this.tema() === 'sistema' && prefereEscuro());
    document.documentElement.classList.toggle('dark', escuro);
    document.documentElement.style.colorScheme = escuro ? 'dark' : 'light';
  }
}

function lerTema(): Tema {
  const salvo = localStorage.getItem(CHAVE);
  if (salvo === 'claro' || salvo === 'escuro' || salvo === 'sistema') {
    return salvo;
  }
  return 'sistema';
}

function prefereEscuro(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}
