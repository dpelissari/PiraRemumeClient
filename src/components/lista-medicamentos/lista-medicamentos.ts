import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CardMedicamento } from '../card-medicamento/card-medicamento';
import { MedicamentoService } from '../../app/core/services/medicamento.service';
import { Medicamento } from '../../app/core/models/medicamento.models';

@Component({
  selector: 'app-lista-medicamentos',
  imports: [CardMedicamento],
  templateUrl: './lista-medicamentos.html',
  styleUrl: './lista-medicamentos.css',
})
export class ListaMedicamentos implements OnInit {
  private readonly medicamentoService = inject(MedicamentoService);
  private readonly tamanhoPagina = 12;

  medicamentos = signal<Medicamento[]>([]);
  pagina = signal(1);
  total = signal(0);
  totalPaginas = signal(1);
  /** Só true na 1ª carga — evita trocar a grade por skeleton ao paginar */
  carregandoInicial = signal(true);
  /** True em qualquer request (inclui troca de página) */
  carregando = signal(false);
  erro = signal<string | null>(null);

  temAnterior = computed(() => this.pagina() > 1);
  temProxima = computed(() => this.pagina() < this.totalPaginas());

  ngOnInit(): void {
    this.carregar(1);
  }

  carregar(pagina: number): void {
    this.carregando.set(true);
    this.erro.set(null);

    this.medicamentoService.listar(pagina, this.tamanhoPagina).subscribe({
      next: (resultado) => {
        this.medicamentos.set(resultado.itens ?? []);
        this.pagina.set(resultado.pagina);
        this.total.set(resultado.total);
        this.totalPaginas.set(Math.max(resultado.totalPaginas, 1));
        this.carregando.set(false);
        this.carregandoInicial.set(false);
      },
      error: (err) => {
        this.erro.set('Não foi possível carregar os medicamentos.');
        this.carregando.set(false);
        this.carregandoInicial.set(false);
        console.error(err);
      },
    });
  }

  paginaAnterior(): void {
    if (!this.temAnterior() || this.carregando()) return;
    this.carregar(this.pagina() - 1);
  }

  paginaProxima(): void {
    if (!this.temProxima() || this.carregando()) return;
    this.carregar(this.pagina() + 1);
  }
}
