import { Component, inject } from '@angular/core';
import { Tema, TemaService } from '../../app/core/services/tema.service';

@Component({
  selector: 'app-seletor-tema',
  standalone: true,
  templateUrl: './seletor-tema.html',
})
export class SeletorTema {
  private readonly temas = inject(TemaService);
  readonly tema = this.temas.tema;

  definir(tema: Tema): void {
    this.temas.definir(tema);
  }
}
