import { Component, inject, OnInit, signal } from '@angular/core';
import { CardMedicamento } from '../card-medicamento/card-medicamento';
import { MedicamentoService } from '../../app/core/services/medicamento.service';
import { Medicamento } from '../../app/core/models/medicamento.models';

@Component({
  selector: 'app-lista-medicamentos',
  imports: [CardMedicamento],
  templateUrl: './lista-medicamentos.html',
  styleUrl: './lista-medicamentos.css',
})

export class ListaMedicamentos implements OnInit{
  private readonly medicamentoService = inject(MedicamentoService);

  medicamentos = signal<Medicamento[]>([]); // Lista vinda da API
  carregando = signal(true);                 // true enquanto aguarda resposta
  erro = signal<string | null>(null);        // mensagem se a API falhar

ngOnInit(): void {
    // Dispara ao abrir a página (/medicamentos)
    this.medicamentoService.listar().subscribe({
      next: (dados) => {
        this.medicamentos.set(dados);
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