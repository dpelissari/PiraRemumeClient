import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Medicamento } from '../../app/core/models/medicamento.models';

@Component({
  selector: 'app-card-medicamento',
  imports: [RouterLink],
  templateUrl: './card-medicamento.html',
  styleUrl: './card-medicamento.css',
})
export class CardMedicamento {
  medicamento = input.required<Medicamento>();

  rotuloOnde(): string {
    const med = this.medicamento();
    if (med.todasAsFarmacias) {
      return 'Disponível em toda a rede';
    }
    if (med.apresentacoes.every((item) => item.abrangencia === 'Restrito')) {
      return 'Disponível em algumas farmácias';
    }
    return 'Algumas formas em farmácias específicas';
  }

  soEmAlgumas(): boolean {
    return !this.medicamento().todasAsFarmacias;
  }
}
