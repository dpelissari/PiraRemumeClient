import { Component, inject, OnInit, signal } from '@angular/core';
import { MedicamentoService } from '../../core/services/medicamento.service';
import { Medicamento } from '../../core/models/medicamento.models';

@Component({
  selector: 'app-medicamentos',
  standalone: true,
  templateUrl: './medicamentos.html'
})
export class Medicamentos implements OnInit {
  private readonly medicamentoService = inject(MedicamentoService);

  medicamentos = signal<Medicamento[]>([]); // Lista vinda da API
  carregando = signal(true);                 // true enquanto aguarda resposta
  erro = signal<string | null>(null);        // mensagem se a API falhar

  ngOnInit(): void {
    // Dispara ao abrir a página (/medicamentos)
    this.medicamentoService.listar().subscribe({
      next: (resultado) => {
        this.medicamentos.set(resultado.itens ?? []);
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
