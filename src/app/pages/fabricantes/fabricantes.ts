import { Component, inject, OnInit, signal } from '@angular/core';
import { Fabricante } from '../../core/models/fabricante.models';
import { FabricanteService } from '../../core/services/fabricante.service';

@Component({
  selector: 'app-fabricantes',
  standalone: true,
  templateUrl: './fabricantes.html'
})
export class fabricantes implements OnInit {
  private readonly fabricanteService = inject(FabricanteService);

  fabricantes = signal<Fabricante[]>([]); // Lista vinda da API
  carregando = signal(true);                 // true enquanto aguarda resposta
  erro = signal<string | null>(null);        // mensagem se a API falhar

  ngOnInit(): void {
    this.fabricanteService.listar().subscribe({
      next: (dados) => {
        this.fabricantes.set(dados);
        this.carregando.set(false);
      },
      error: (err) => {
        this.erro.set('Não foi possível carregar os medicamentos.');
        this.carregando.set(false);
        console.error(err);
      }
    });
  }
}
