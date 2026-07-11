import { Component, input, signal } from '@angular/core';
import { TipoConsulta } from '../tipo-consulta/tipo-consulta';

@Component({
  selector: 'app-painel-consulta',
  imports: [TipoConsulta],
  templateUrl: './painel-consulta.html',
  styleUrl: './painel-consulta.css',
})

export class PainelConsulta {

  protected termoDigitado = signal('');
  aoDigitar(evento: Event){
    const input = evento.target as HTMLInputElement;
    this.termoDigitado.set(input.value);
  }

  buscar() {
    console.log(this.termoDigitado())
  }

  placeHolder = signal<string>('Ex: Amoxilina, Metformina, etc.');

  atualizarPlaceHolder(texto : string){
    this.placeHolder.set(texto);
  }
}
