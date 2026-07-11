import { Component, output, signal } from '@angular/core';

type TipoBusca = 'medicamento' | 'principio-ativo' | 'classe-terapeutica';

@Component({
  selector: 'app-tipo-consulta',
  imports: [],
  templateUrl: './tipo-consulta.html',
  styleUrl: './tipo-consulta.css',
})

export class TipoConsulta {
 
 protected buscaAtiva = signal<TipoBusca>('medicamento');

 setTipoBusca(tipo:TipoBusca):void{

  this.buscaAtiva.set(tipo);
  console.log(`Buscando por: ${tipo}`);
  
  if (tipo == 'medicamento')
    this.alterarPlaceholder('Ex: Amoxilina, Metformina, etc.');

  if (tipo == 'principio-ativo')
    this.alterarPlaceholder('Ex: Omeprazol, Captopril, etc.');

  if (tipo == 'classe-terapeutica')
    this.alterarPlaceholder('Ex: Antibiótico, Anti-hipertensivo…');
 }

 // evento que comunica o pai se o placeholder mudou
 mudouPlaceholder = output<string>();
 
 // altera o placeholder do input no componente pai com base no click no tipo
 alterarPlaceholder(novoPlaceholder:string){
  this.mudouPlaceholder.emit(novoPlaceholder);
 }

}
